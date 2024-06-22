import mongoose from 'mongoose';

const likeSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: mongoose.Types.ObjectId,
            ref: "postMessage",
            required: true,
        }
        
    },
    { timestamps: true }
);

const LikeModel = mongoose.model('LikeModel', likeSchema);

export default LikeModel;