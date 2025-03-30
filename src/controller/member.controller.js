import { Member } from "../model/member.model.js";
import { deleteFromCloudinary,uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const saveMember=asyncHandler(async(req,res)=>{

    const {category,post,name,about,phoneNumber,email}=req.body

    if(!category || !name || !about){
        throw new ApiError(404,"category, name ,about are required!!")
    }
    const existedUser=await Member.findOne({
        $or:[{name},{about}]
    })
    if(existedUser){
        throw new ApiError(409,"member already exist")
    }
    const avatarLocalPath=req.files?.avatar[0]?.path 

    const avatar=await uploadOnCloudinary(avatarLocalPath)
    
    const member= await Member.create({
        category,
        post,
        name,
        about,
        phoneNumber,
        email,
        avatar:{
            url: avatar.url,
            publicId: avatar.public_id
          }
    })
    if(!member){
        throw new ApiError(500,"Something went wrong while registering the user")
      }
    return res.status(201).json(new ApiResponse(200,member,"Member saved successfully"))
})

export {saveMember}