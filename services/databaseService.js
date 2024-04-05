const { MongoClient, ObjectId } = require("mongodb");

const MONGO_URL = `mongodb+srv://bondmaksim2005:<bondmaksim2005>@cluster0.lpweowe.mongodb.net/`;
const DB_NAME = "my_database";
const COLLECTION_NAME = "users";

const client = new MongoClient(MONGO_URL);
let collection;

async function connectToMongoDB() {
  await client.connect();
  const db = client.db(DB_NAME);
  collection = db.collection(COLLECTION_NAME);
}

async function disconnectFromMongoDB() {
  if (client) {
    await client.close();
  }
}

async function getItems() {
  const users = await collection.find({}).toArray();
  return users;
}

async function createItem(name) {
  try {
    const result = await collection.insertOne({ name });

    if (result) {
      const insertedId = result.insertedId;
      const createdItem = await collection.findOne({ _id: insertedId });
      return createdItem;
    } else {
      throw new Error("Failed to insert item");
    }
  } catch (err) {
    console.error("Error in createItem:", err.message);
    return { error: err.message };
  }
}

async function updateItem(id, name) {
  try {
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { name } });
    const updatedItem = await collection.findOne({ _id: new ObjectId(id) });
    return updatedItem;
  } catch (err) {
    console.error("Error in updateItem:", err.message);
    return { error: err.message };
  }
}

async function deleteItem(id) {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId");
    }

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (err) {
    console.error("Error in deleteItem:", err.message);
    return { error: err.message };
  }
}

module.exports = {
  connectToMongoDB,
  disconnectFromMongoDB,
  createItem,
  getItems,
  updateItem,
  deleteItem,
};
