const express = require("express");
const mongoose = require("mongoose");
const mongoService = require("./services/databaseService");

const app = express();
const port = 3000;

app.use(express.json());

const MONGO_URL = `mongodb+srv://bondmaksim2005:bondmaks@cluster0.lpweowe.mongodb.net/`;

async function main() {
  await mongoose.connect(MONGO_URL, {
    dbName: "mongoose",
  });
}

main().catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connect to MongoDB"));

app.get("/users", async (req, res) => {
  try {
    const users = await mongoService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await mongoService.createUser(name, email);
    return res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const users = await mongoService.getAllPosts();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/posts", async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const newPost = await mongoService.createPost(title, content, userId);
    return res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/comments", async (req, res) => {
  try {
    const users = await mongoService.getAllComments();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/comments", async (req, res) => {
  const { message, postId, userId } = req.body;
  try {
    const newComment = await mongoService.createComment(
      message,
      postId,
      userId
    );
    return res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users-with-posts", async (req, res) => {
  try {
    const usersWithPosts = await mongoService.getUsersWithPosts();
    res.json(usersWithPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users-with-multiple-comments", async (req, res) => {
  try {
    const usersWithPosts = await mongoService.getUsersWithMultipleComments();
    res.json(usersWithPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await mongoService.deleteUserAndAllRegardingData(id);
    res
      .status(200)
      .json({ message: "User and their posts deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use((req, res) => {
  console.error(res);
  res.status(400).send("Bad Request!");
});

app.use((req, res) => {
  console.error(res);
  res.status(500).send("Server error!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
