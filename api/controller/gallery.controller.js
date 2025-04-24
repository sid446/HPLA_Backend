import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Gallery } from "../model/gallery.model.js";




import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js"; // Import delete function

const SavePhoto = AsyncHandler(async (req, res) => {
  const { description, category } = req.body;
  const photoLocalPath = req.file?.path;
  
  if (!photoLocalPath) {
    throw new ApiError(400, "Photo file is required");
  }

  // Upload photo to Cloudinary
  const photo = await uploadOnCloudinary(photoLocalPath);

  if (!photo?.url || !photo?.public_id) {
    throw new ApiError(500, "Error uploading photo to Cloudinary");
  }

  // Save photo details in the database
  const gallery = await Gallery.create({
    photo: {
      url: photo.url,
      publicId: photo.public_id,
    },
    description,
    category
  });

  if (!gallery) {
    throw new ApiError(400, "Failed to save photo details in database");
  }

  // Return success response
  return res
    .status(201)
    .json(new ApiResponse(201, gallery, "Photo uploaded successfully"));
});

const getPhoto = AsyncHandler(async (req, res) => {
  const photos = await Gallery.find();
  return res
    .status(200)
    .json(new ApiResponse(200, photos, "Photos fetched successfully"));
});

const deletePhoto = AsyncHandler(async (req, res) => {
  console.log('Request body:', req.body); // Log entire body
 
  
  const { id } = req.body;
  console.log('Extracted ID:', id); // Log the extracted ID

  if (!id) {
      console.error('No ID provided in request');
      throw new ApiError(400, "Photo ID is required");
  }

  const photo = await Gallery.findById(id);
  if (!photo) {
      console.error('Photo not found in database for ID:', id);
      throw new ApiError(404, "Photo not found");
  }

  console.log('Deleting from Cloudinary:', photo.photo.publicId);
  const deletionResult = await deleteFromCloudinary(photo.photo.publicId);

  if (!deletionResult) {
      console.error('Cloudinary deletion failed for:', photo.photo.publicId);
      throw new ApiError(500, "Error deleting photo from Cloudinary");
  }

  console.log('Deleting from database:', id);
  await Gallery.findByIdAndDelete(id);

  return res.status(200).json(new ApiResponse(200, "Photo deleted successfully"));
});

export { SavePhoto, getPhoto, deletePhoto };
