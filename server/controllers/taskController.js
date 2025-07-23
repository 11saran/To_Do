const Task = require("../models/taskModel");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.getRecentTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    await Task.addTask(title, description);
    res.status(201).json({ message: "Task added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markDone = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.completeTask(id);
    res.json({ message: "Task marked as done" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.deleteTask(id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    await Task.editTask(id, title, description);
    res.json({ message: "Task updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
