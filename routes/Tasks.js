const express = require("express");
const router = express.Router();

const {
  newTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controller/Tasks");

router.post("/tasks", newTask);
router.get("/tasks", getTasks);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
