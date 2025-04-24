import mongoose from "mongoose";


const AnnualReportSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }

},{timestamps:true});

export const AnnualReport = mongoose.model("AnnualReport", AnnualReportSchema);