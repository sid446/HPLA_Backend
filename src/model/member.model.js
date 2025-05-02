import mongoose from "mongoose";

const MemberSchema= new mongoose.Schema({
    category:{
        type:String,
        require:true
    },
    post:{
        type:String
    },
    name:{
        type:String,
        require:true
    },
    about:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String
    },
    email:{
        type:String
    },
    avatar:{
        url:{
            type: String,
            
        },
        publicId: {
            type: String
        }
    }
},{timestamps:true})

export const Member =mongoose.model("Member",MemberSchema)