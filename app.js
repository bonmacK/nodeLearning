const express = require("express");
const items = require("./db");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//CRUD

//create
app.post("/item", (req, res) => {
  items.push(req.body);
  return res.json(req.body);
});

//read

app.get("/items", (req, res) => {
  return res.json(items);
});

app.put("/item/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.body.name);
  items.map((item) => {
    if (item.id === +id) {
      item.name = req.body.name;
    }
  });
  return res.json(req.body);
});

app.delete("/item/:id", (req, res) => {
  const { id } = req.params;
  items.filter((item) => item.id !== +id);
  return res.json(items);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
