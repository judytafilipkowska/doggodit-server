const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const isAuthenticated = require("./../middleware/jwt.middleware");
const mongoose = require("mongoose");
const User = require("../models/user.model");



//POST /api/postss
router.post("/api/posts", isAuthenticated, async (req, res, next) => {
    try {

        const { tag, postImage, postText } = req.body;
        const currentUser = req.payload;
        const userId = currentUser._id

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({ message: "There is no such user" });
            return;
        }

        const createdPost = await Post.create({
            tag, postText, postImage, createdBy: currentUser._id
        });
        await User.findByIdAndUpdate(userId, { $push: { posts: createdPost._id } });

        res.status(201).json(createdPost);

    } catch (error) {
        next(error);
    }
})

// GET /api/posts
router.get("/api/posts", async (req, res, next) => {
    try {
        const feed = await Post.find().populate("comments");

        res.status(200).json(feed);
    } catch (error) {
        next(error);
    }
})

//GET /api/posts/:postId

router.get("/api/posts/:postId", async (req, res, next) => {
    try {
        const { postId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            res.status(400).json({ message: "There is no such post" });
            return;
        }

        const onePost = await Post.findById(postId).populate("comments");
        res.status(200).json(onePost);
    } catch (error) {
        next(error);
    }
})


// POST /api/comments
router.post("/api/comments", isAuthenticated, async (req, res, next) => {
    try {

        const { commentText, postId } = req.body;


        if (!mongoose.Types.ObjectId.isValid(postId)) {
            res.status(400).json({ message: "There is no such post" });
            return;
        }
        const currentUser = req.payload;



        const createdComment = await Comment.create({ commentText, addedBy: currentUser._id, post: postId });
        await Post.findByIdAndUpdate(postId, { $push: { comments: createdComment._id } });

        res.status(201).json(createdComment);
    } catch (error) {
        next(error);
    }
})


module.exports = router;