import mongoose from "mongoose";

const OtherMemberSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  designation:{
    type:String,
    required:true
  },
  affiliation:{
    type:String,
    required:true
  },
  mobile:{
    type:String,
    required:true
  },
  memberShipNumber:{
    type:String,
    required:true
  },
    type:{
        type:String,
        required:true
    }
  

})

export const OtherMember=mongoose.model("OtherMember",OtherMemberSchema)
