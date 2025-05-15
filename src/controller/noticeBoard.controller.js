import { Notice } from "../model/noticeBoard.model.js";
import { AsyncHandler } from "../utils/sexy boi.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const addNotice=AsyncHandler(async(req,res)=>{
    const {title,description,slug}=req.body
    if(!title || !description  ){
      throw new ApiError(400,"all field required")
    }
    const notice = await Notice.create({
        title,
        description,
        slug
    })
    if(!notice){
        throw new ApiError(404,"Something went wrong while creating notice board")
    }
    
    res
    .status(201)
    .json(new ApiResponse(200,notice,"Notice added successfully"))
})

export const editNotice=AsyncHandler(async(req,res)=>{
    const {_id,title,description,slug}=req.body
    console.log(_id)
    if(!_id){
        throw new ApiError(400,"Id is required")
    }
    const ExistedNotice=await Notice.findById(_id)
    if(!ExistedNotice){
        throw new ApiError(404,"Notice Id Invalid")
    }
    const UpdatedNotice=await Notice.findByIdAndUpdate(_id,
        {title,description,slug},
        {new:true,runValidators:true}
    )
    if(!UpdatedNotice){
        throw new ApiError(400,"something went wrong while updating notice")
    }
    
    res
    .status(201)
    .json(new ApiResponse(200,UpdatedNotice,"Notice updated successfully"))
})

export const DeleteNotice = AsyncHandler(async (req, res) => {
  const { id } = req.query;

  if (!id) {
    throw new ApiError(400, "Id is required");
  }

  const existedNotice = await Notice.findById(id);

  if (!existedNotice) {
    throw new ApiError(404, "Notice does not exist");
  }

  await Notice.findByIdAndDelete(id);

  res.status(200).json(new ApiResponse(200, "Deleted successfully"));
});

export const getNotice = AsyncHandler(async (req, res) => {
  const notices = await Notice.find().sort({ createdAt: -1 });

  if (!notices || notices.length === 0) {
    throw new ApiError(404, "No notices found");
  }

  res.status(200).json(new ApiResponse(200, notices, "Notices fetched successfully"));
});
