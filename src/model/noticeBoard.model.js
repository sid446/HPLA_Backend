import { Schema } from "mongoose";
import mongoose from "mongoose";

const NoticeBoardSchema=new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
    }

},{timestamps:true})

export const Notice = mongoose.model("NoticeBoard",NoticeBoardSchema)

