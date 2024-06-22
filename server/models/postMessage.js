import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    {
        creator: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String,
            required: true,
            maxLength: [1000, "Must be no more than 1000 characters"],
        },
        tags: [String],
        selectedFile: String,
        likeCount: {
            type: Number,
            default: 0,
        },
        saveCount: {
            type: Number,
            default: 0,
        },
        commentCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const PostMessage = mongoose.model('postMessage', postSchema);

export default PostMessage;