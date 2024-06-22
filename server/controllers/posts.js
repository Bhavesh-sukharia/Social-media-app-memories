import PostMessage from "../models/postMessage.js";
import User from '../models/user.js';
import LikeModel from '../models/like.js';
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import SaveModel from "../models/savePost.js";

const extractUserId = (req) => {

    const token = req.headers?.authorization?.split(" ")[1];

    let decodedData;
    let userId;

    if(token) {
        decodedData = jwt.verify(token, process.env.TOKEN_KEY);

        userId = decodedData?.id;
    }

    return userId;
}

const setUserActions = async (posts, userId) => {

    const userLikedPosts = await LikeModel.find({ user: userId }, 'post');
    const userSavedPosts = await SaveModel.find({ user: userId }, 'post');

    const likedPostIds = new Set(userLikedPosts.map(like => like.post.toString()));
    const savedPostIds = new Set(userSavedPosts.map(save => save.post.toString()));

    posts.forEach((post) => {
        if (likedPostIds.has(post._id.toString())) {
            post.liked = true;
        } else {
            post.liked = false;
        }

        if (savedPostIds.has(post._id.toString())) {
            post.saved = true;
        } else {
            post.saved = false;
        }
    });
};

const filterUserPosts = async (user) => {

    const validPostIds = await PostMessage.find({}, '_id').then(posts => posts.map(post => post._id.toString()));

    user.liked = user.liked.filter( postId => validPostIds.includes(postId.toString()) );
    user.saved = user.saved.filter( postId => validPostIds.includes(postId.toString()) );

    await user.save();
};

export const getPost = async (req, res) => {
    const { id } = req.params;
    const userId = extractUserId(req);
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Post does not exist");
        }

        const post = await PostMessage.findById(id)
                    .populate("creator", "-password")
                    .lean();

        if (!post) {
            throw new Error("Post does not exist");
        }

        if(userId) {
            await setUserActions([post], userId);
        }

        res.status(200).json(post);
    }
    catch(error) {
        res.status(404).json({ messsage : error.message});
    }
};

export const getPosts = async (req, res) => {
    try {
        let { search, sortBy, userName, type } = req.query;

        const userId = extractUserId(req);
        
        let query = {};
        
        if (search) {
            query.$or = [
                { message: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } }
            ];
        }

        let sortOptions = {};

        if (sortBy === 'Recent') {
            sortOptions.createdAt = -1;
        } else if (sortBy === 'Oldest') {
            sortOptions.createdAt = 1;
        } else if (sortBy === 'Likes') {
            sortOptions.likeCount = -1;
        } else if (sortBy === 'Comments') {
            sortOptions.CommentCount = -1;
        }

        let posts = await PostMessage.find(query)
            .populate("creator", "-password")
            .sort(sortOptions)
            .lean();


        if (userName) {

            let user = await User.findOne({ username: userName }).select('-password');
            let ids = [];

            await filterUserPosts(user);

            if(type === 'liked') {
                ids = user?.liked;
                posts = await PostMessage.find({ _id: { $in: ids } })
                        .populate("creator", "-password")
                        .lean();
            }else if(type === 'saved') {
                ids = user?.saved;
                posts = await PostMessage.find({ _id: { $in: ids } })
                        .populate("creator", "-password")
                        .lean();
            }else{
                posts = posts.filter((post) => post.creator.username == userName);
            }
        }

        if(userId){
            await setUserActions(posts, userId);
        }

        res.status(200).json({ data: posts });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({...post, creator: req.userId});

    try {
        await newPost.save();

        res.status(201).json(newPost);
    }
    catch(error) {
        res.status(409).json({ message :error.message });
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with this id');

    const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});

    res.json(updatePost);
};

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with this id');

    await PostMessage.findByIdAndDelete(_id);

    res.json({message: 'Post Deleted Successfully'});
};

export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated." });

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with this id');

    try {
        const post = await PostMessage.findById(_id);
        if (!post) return res.status(404).send('No Post with this id');

        const user = await User.findById(req.userId);
        if (!user) return res.status(404).send('No User with this id');

        const existingLike = await LikeModel.findOne({ user: req.userId, post: _id });

        if (existingLike) {
            await LikeModel.deleteOne({ _id: existingLike._id });

            await User.updateOne({ _id: user._id }, { $pull: { liked: _id } });
        } else {
            const newLike = new LikeModel({ user: req.userId, post: _id });
            await newLike.save();

            await User.updateOne({ _id: user._id }, { $push: { liked: _id } });
        }

        const likes =  (await LikeModel.find({ post: _id })).length;

        await PostMessage.updateOne({ _id }, { likeCount: likes });

        const updatedPost = await PostMessage.findById(_id).populate('creator', '-password').lean();                        

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const savePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated." });

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with this id');

    try {
        const post = await PostMessage.findById(_id);
        if (!post) return res.status(404).send('No Post with this id');

        const user = await User.findById(req.userId);
        if (!user) return res.status(404).send('No User with this id');

        const existingLike = await SaveModel.findOne({ user: req.userId, post: _id });

        if (existingLike) {
            await SaveModel.deleteOne({ _id: existingLike._id });

            await User.updateOne({ _id: user._id }, { $pull: { saved: _id } });
        } else {
            const newSave = new SaveModel({ user: req.userId, post: _id });
            await newSave.save();

            await User.updateOne({ _id: user._id }, { $push: { saved: _id } });
        }

        const saves =  (await SaveModel.find({ post: _id })).length;

        await PostMessage.updateOne({ _id }, { saveCount: saves });

        const updatedPost = await PostMessage.findById(_id).populate('creator', '-password').lean();                        

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body; 

    if(!req.userId) return res.json({ message: "Unauthenticated."});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with this id');

    const post = await PostMessage.findById( id );

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

    res.json(updatedPost);
};


