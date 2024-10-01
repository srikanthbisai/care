import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({ 
    status: {
        type: String,
        required: true,
        enum: ["ok", "error"],
    },
    totalResults: {
        type: Number,
        required: true,
    },
    articles: [
        {
            source: {
                id: { type: String, default: null }, // Can be null
                name: { type: String, required: true },
            },
            author: { type: String, default: 'Unknown' }, // Default to 'Unknown' if not available
            title: { type: String, required: true },
            description: { type: String, default: '' }, // Default to empty string
            url: { type: String, required: true },
            urlToImage: { type: String, default: '' }, // Default to empty string
            publishedAt: { type: Date, required: true }, // Ensure valid date format
            content: { type: String, default: '' }, // Default to empty string
        },
    ],
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog; 
