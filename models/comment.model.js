const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    commentText: { type: String, reqired: true },
    addedBy: { type: Schema.Types.ObjectId, ref: "User" },
    post: { type: Schema.Types.ObjectId, ref: "Post" }
})

module.exports = model("Comment", commentSchema);









