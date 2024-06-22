import mongoose from 'mongoose';

const saveSchema = mongoose.Schema(
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

const SaveModel = mongoose.model('SaveModel', saveSchema);

export default SaveModel;