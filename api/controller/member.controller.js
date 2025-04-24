import { Member } from "../model/member.model.js";
import { deleteFromCloudinary,uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const saveMember = asyncHandler(async (req, res) => {
    const { category, post, name, about, phoneNumber, email } = req.body;

    if (!category || !name || !about) {
        throw new ApiError(400, "category, name, and about are required!");
    }

    const existedUser = await Member.findOne({
        $or: [{ name }, { about }]
    });
    if (existedUser) {
        throw new ApiError(409, "Member already exists");
    }

    let avatarData = null;
    
    // Upload avatar only if a file is provided
    if (req.files?.avatar?.[0]?.path) {
        const avatarLocalPath = req.files.avatar[0].path;
        const avatar = await uploadOnCloudinary(avatarLocalPath);

        if (avatar && avatar.url) {
            avatarData = {
                url: avatar.url,
                publicId: avatar.public_id
            };
        }
    }

    const member = await Member.create({
        category,
        post,
        name,
        about,
        phoneNumber,
        email,
        avatar: avatarData // Will be null if no avatar is uploaded
    });

    if (!member) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(new ApiResponse(200, member, "Member saved successfully"));
});


const updateMember = asyncHandler(async (req, res) => {
    console.log("Received Headers:", req.headers);
    console.log("Received Body:", req.body);
    console.log("Received File:", req.file);

    const { _id, category, post, name, about, phoneNumber, email } = req.body;
    if (!_id) {
        return res.status(400).json({ error: "Member ID is required" });
    }

    const member = await Member.findById(_id);
    if (!member) {
        return res.status(404).json({ error: "Member does not exist" });
    }

    let avatarData = member.avatar;
    if (req.file) {
        if (member.avatar?.publicId) {
            await deleteFromCloudinary(member.avatar.publicId);
        }
        const avatar = await uploadOnCloudinary(req.file.path);
        if (!avatar || !avatar.url) {
            return res.status(500).json({ error: "Image upload failed" });
        }
        avatarData = { url: avatar.url, publicId: avatar.public_id };
    }

    const updatedMember = await Member.findByIdAndUpdate(
        _id,
        { category, post, name, about, phoneNumber, email, avatar: avatarData },
        { new: true, runValidators: true }
    );

    res.status(200).json(new ApiResponse(200, updatedMember, "Member updated successfully"));
});
const getAllMembers = asyncHandler(async (req, res) => {
    const members = await Member.find();

    if (!members || members.length === 0) {
        throw new ApiError(404, "No members found");
    }

    res.status(200).json(new ApiResponse(200, members, "Members retrieved successfully"));
});


export {saveMember,updateMember,getAllMembers}