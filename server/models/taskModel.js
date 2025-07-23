const db = require("../config/db");

exports.getRecentTasks = async () => {
  const [rows] = await db.query(
    "SELECT * FROM task WHERE is_completed = false ORDER BY created_at DESC LIMIT 5"
  );
  return rows;
};

exports.addTask = async (title, description) => {
  await db.query("INSERT INTO task (title, description) VALUES (?, ?)", [
    title,
    description,
  ]);
};

exports.completeTask = async (id) => {
  await db.query("UPDATE task SET is_completed = true WHERE id = ?", [id]);
};

exports.deleteTask = async (id) => {
  await db.query("DELETE FROM task WHERE id = ?", [id]);
};

exports.editTask = async (id, title, description) => {
  await db.query("UPDATE task SET title = ?, description = ? WHERE id = ?", [
    title,
    description,
    id,
  ]);
};
