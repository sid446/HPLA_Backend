import { News } from "../model/news.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const saveNews = asyncHandler(async (req, res) => {
    const { title, category, content } = req.body;

    if (!title || !category || !content) {
        throw new ApiError(400, "All fields are required");
    }

    const existedNews = await News.findOne({ title });
    if (existedNews) {
        throw new ApiError(409, "News with this title already exists");
    }

    let imagesData = [];
    console.log(req.files);
    // Upload multiple images if provided
    if (req.files?.length) {
        for (const file of req.files) {
            const imageLocalPath = file.path;
            const image = await uploadOnCloudinary(imageLocalPath);
            console.log(image);

            if (image?.url) {
                imagesData.push({
                    url: image.url,
                    publicId: image.public_id
                });
            }
        }
    }

    const news = await News.create({
        title,
        category,
        content,
        images: imagesData 
    });

    if (!news) {
        throw new ApiError(500, "Something went wrong while saving the news");
    }

    return res.status(201).json(new ApiResponse(200, news, "News saved successfully"));
});

const getNews =asyncHandler(async(req,res)=>{
    const news= await News.find()
    if(!news){
        throw new ApiError(404,"no news exist")
    }
    res
    .status(201)
    .json(new ApiResponse(200,news,"successfully fetched news"))
})
const deleteNews=asyncHandler(async(req,res)=>{
    const { id } = req.body;
    if (!id) {
        throw new ApiError(400, "News ID is required");
    }

    const news = await News.findByIdAndDelete(id);
    if (!news) {
        throw new ApiError(404, "News not found");
    }

   
    for (const image of news.images) {
        await deleteFromCloudinary(image.publicId);
    }

    return res.status(200).json(new ApiResponse(200, null, "News deleted successfully"));
})

export { saveNews,getNews,deleteNews };