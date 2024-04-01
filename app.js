const express = require("express");
const databaseService = require("./services/databaseService");

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/users", async (req, res) => {
  databaseService.getItems((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.post("/items", (req, res) => {
  const { name } = req.body;
  databaseService.createItem(name, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  databaseService.updateItem(id, name, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.delete("/items/:id", (req, res) => {
  const { userId } = req.params;
  databaseService.deleteItem(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${PORT}`);
});
