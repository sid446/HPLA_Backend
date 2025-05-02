import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    }
});

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    images: [imageSchema] 
}, { timestamps: true });

export const News = mongoose.model("News", newsSchema);