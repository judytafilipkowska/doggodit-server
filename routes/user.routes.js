const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const isAuthenticated = require("./../middleware/jwt.middleware");
const mongoose = require('mongoose');
const fileUploader = require("../config/cloudinary");

// GET /api/users/current  - Get current user info
router.get('/api/users/current', isAuthenticated, async (req, res, next) => {
  try {
    const currentUser = req.payload;
    const user = await User.findById(currentUser._id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
})

// PUT /api/users/current  - Update the current user
router.put('/api/users/current', isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    const currentUser = req.payload;

    const { email, name, image } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      { email, name, image },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
})

// GET / api / users / current / posts

router.get("/api/users/current/:userId/posts", isAuthenticated, async (req, res, next) => {
  try {

    const { userId } = req.params

    const allPosts = await User.findById(userId).populate("posts");
    res.status(200).json(allPosts);


  } catch (error) {
    next(error);
  }
})

//GET /api/users/current/posts/:postId
router.get("/api/users/current/posts/:postId", isAuthenticated, async (req, res, next) => {
  try {

    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      res.status(400).json({ message: "There is no such post" });
      return;
    }

    const onePost = await Post.findById(postId).populate("comments createdBy");

    res.status(200).json(onePost);
  } catch (error) {
    next(error);
  }
}
);

// delete /api/users/current/posts/:postId

router.delete("/api/users/current/posts/:postId", isAuthenticated, async (req, res, next) => {
  try {
    const { postId } = req.params;
    console.log(postId);

    await Post.findByIdAndDelete(postId);

    res.status(204).send();
  } catch (error) {
    next();
  }
});

//PUT /api/users/current/posts/:postId/edit

router.put("/api/users/current/posts/:postId/edit", isAuthenticated, async (req, res, next) => {
  try {

    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      res.status(400).json({ message: "There is no such post" });
      return;
    }


    const { tag, postText, postImage } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { tag, postText, postImage },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    next();
  }
});


//GET /api/users/current/interactions 

router.get("/api/users/current/interactions", isAuthenticated, async (req, res, next) => {
  try {

    const currentUser = req.payload;
    const userId = currentUser._id
    const populateComments = await Comment.find().populate({ path: "post", populate: { path: "createdBy" } })

    const resultsArr = populateComments.filter(comment => {
      return (comment.addedBy._id == userId)
    })

    res.status(200).json([resultsArr]);
  } catch (error) {
    next(error)
  }
})


module.exports = router;
