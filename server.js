const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { addTask, getTasks, deleteTask } = require("./cosmosClient");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Get all tasks
app.get("/api/tasks", async (req, res) => {
  const tasks = await getTasks();
  res.json(tasks);
});

// Add new task
app.post("/api/tasks", async (req, res) => {
  const task = await addTask(req.body);
  res.json(task);
});

// Delete a task
app.delete("/api/tasks/:id", async (req, res) => {
  const id = req.params.id;
  await deleteTask(id);
  res.json({ message: "Deleted" });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
