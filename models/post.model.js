const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
    tag: { type: String, reqired: true, enum: ["question", "showing off", "just sharing", "help"] },
    postText: { type: String },
    postImage: { type: String },
    dogBreed: { type: Number },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },

    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
})

module.exports = model("Post", postSchema);
