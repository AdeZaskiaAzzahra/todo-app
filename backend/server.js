require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.put("/toggle/:id", async (req, res) => {
const todo = await Todo.findById(req.params.id);
todo.completed = !todo.completed;
await todo.save();
res.send("Updated");
});

// koneksi database
mongoose.connect("mongodb://adekynara_db_user:cwnYcYJlkBfOPe38@ac-1wchmxb-shard-00-00.clkzliw.mongodb.net:27017,ac-1wchmxb-shard-00-01.clkzliw.mongodb.net:27017,ac-1wchmxb-shard-00-02.clkzliw.mongodb.net:27017/todoDB?ssl=true&replicaSet=atlas-quu8ga-shard-0&authSource=admin&retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// model
const Todo = mongoose.model("Todo", {
text: String,
date: String,
completed: {
    type: Boolean,
    default: false
}
});

// CREATE
app.post("/add", async (req, res) => {
const newTodo = new Todo({
    text: req.body.text,
    date: req.body.date
});

await newTodo.save();
res.send("Added");
});

// READ
app.get("/get", async (req, res) => {
const todos = await Todo.find();
res.json(todos);
});

// DELETE
app.delete("/delete/:id", async (req, res) => {
console.log("ID:", req.params.id);

try {
    await Todo.findByIdAndDelete(req.params.id);
    res.send("Deleted");
} catch (err) {
    console.log(err);
    res.status(500).send("Error deleting");
}
});

app.listen(5000, () => {
console.log("Server jalan di port 5000");
});

