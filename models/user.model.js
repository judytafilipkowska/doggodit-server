const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, unique: true, required: true },
  image: { type: String, default: "https://i.imgur.com/yWHfhiG.png" },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  interactions: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
},
  { timestamps: true });

module.exports = model("User", userSchema);