import mongoose from "mongoose";


const GallerySchema=new mongoose.Schema({
    photo:{
        url:{
            type: String,
            
        },
        publicId: {
            type: String
        }
    },
 description:{
    type:String
 },
 category:{
    type:String
 }

},{timestamps:true})


export const Gallery=mongoose.model("Gallery",GallerySchema)
