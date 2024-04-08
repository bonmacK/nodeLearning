const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  message: { type: String, required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
