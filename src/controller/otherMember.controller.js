import { OtherMember } from "../model/other.model.js";
import { AsyncHandler } from "../utils/sexy boi.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const SaveOtherMember = AsyncHandler(async (req, res) => {
  const { name, designation, affiliation, mobile, memberShipNumber, type } =
    req.body;

  if (
    !name ||
    !designation ||
    !affiliation ||
    !mobile ||
    !memberShipNumber ||
    !type
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await OtherMember.findOne({
    $or: [{ memberShipNumber }],
  });

  if (existedUser) {
    throw new ApiError(409, "Member already exists");
  }

  const otherMember = await OtherMember.create({
    name,
    designation,
    affiliation,
    mobile,
    memberShipNumber,
    type,
  });

  if (!otherMember) {
    throw new ApiError(409, "something went wrong while saving member");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, otherMember, "Member saved successfully"));
});
const UpdateOtherMember = AsyncHandler(async (req, res) => {
  const { id, name, designation, affiliation, mobile, memberShipNumber, type } =
    req.body;

  // Validate required fields
  if (
    !name ||
    !designation ||
    !affiliation ||
    !mobile ||
    !memberShipNumber ||
    !type
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if member exists
  const member = await OtherMember.findById(id);
  if (!member) {
    throw new ApiError(404, "Member not found");
  }

  // Check if new membership number or mobile already exists for another member
  const existingMember = await OtherMember.findOne({
    $and: [
      { _id: { $ne: id } }, // Exclude current member
      { $or: [{ memberShipNumber }, { mobile }] },
    ],
  });

  if (existingMember) {
    throw new ApiError(
      409,
      "Member with this membership number or mobile already exists"
    );
  }

  // Update member
  const updatedMember = await OtherMember.findByIdAndUpdate(
    id,
    {
      $set: {
        name,
        designation,
        affiliation,
        mobile,
        memberShipNumber,
        type,
      },
    },
    { new: true } // Return the updated document
  );

  if (!updatedMember) {
    throw new ApiError(500, "Something went wrong while updating member");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedMember, "Member updated successfully"));
});
const getAllOtherMembers = AsyncHandler(async (req, res) => {
  const members = await OtherMember.find();

  if (!members || members.length === 0) {
    throw new ApiError(404, "No members found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, members, "Members retrieved successfully"));
});
const deleteOtherMember = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Member ID is required");
  }

  const member = await OtherMember.findByIdAndDelete(id);

  if (!member) {
    throw new ApiError(404, "Member not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Member deleted successfully"));
});
export {
  SaveOtherMember,
  UpdateOtherMember,
  getAllOtherMembers,
  deleteOtherMember,
};
