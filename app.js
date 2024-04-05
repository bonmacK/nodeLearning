const express = require("express");
const bodyParser = require("body-parser");
const mongoService = require("./services/databaseService");

const app = express();

app.use(express.json());
app.use(bodyParser.json());

const port = 3000;

mongoService
  .connectToMongoDB()
  .then(() => {
    console.log("Connected to MongoDB");
    // CRUD
    app.post("/users", async (req, res) => {
      const { name } = req.body;
      try {
        const newUser = await mongoService.createItem(name);
        res.json(newUser);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.get("/users", async (req, res) => {
      try {
        const users = await mongoService.getItems();
        res.json(users);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.put("/users/:id", async (req, res) => {
      const { id } = req.params;
      const { name } = req.body;

      try {
        const updatedUser = await mongoService.updateItem(id, name);
        res.json(updatedUser);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.delete("/users/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const updatedUser = await mongoService.deleteItem(id);
        res.json(updatedUser);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    //START Server
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

    app.use((req, res) => {
      console.error(res);
      res.status(404).send("Bad Request!");
    });

    app.use((req, res) => {
      console.error(res);
      res.status(500).send("Server Error!");
    });
  })
  .catch((err) => {
    console.error("`Failed to connect to MongoDB:", err);
    process.exit(1); // EXIT
  });
