const express = require("express");
const router = express.Router();

const { newTask, getTasks } = require("../controller/Tasks");

router.post("/tasks", newTask);
router.get("/tasks", getTasks);

module.exports = router;
