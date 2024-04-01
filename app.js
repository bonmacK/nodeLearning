const express = require("express");
const databaseService = require("./services/databaseService");
const items = require("./db");
const app = express();
app.use(express.json());

const port = 3000;

app.get("/items", async (req, res) => {
  databaseService.getItems((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.post("/item", (req, res) => {
  const { name } = req.body;
  databaseService.createItem(name, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.put("/item/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  databaseService.updateItem(id, name, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.delete("/item/:id", (req, res) => {
  const { id } = req.params;
  items.filter((item) => item.id !== +id);
  databaseService.deleteItem(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
