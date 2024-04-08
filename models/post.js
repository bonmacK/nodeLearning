const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Post", PostSchema);
