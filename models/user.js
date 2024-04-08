const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

module.exports = mongoose.model("User", UserSchema);
