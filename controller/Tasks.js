const Task = require("../models/Task");

exports.newTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      assignedTo,
      dueDate,
      boardId,
      createdAt,
    } = req.body;

    // Basic validation
    if (!title || !boardId) {
      return res
        .status(400)
        .json({ message: "Title and boardId are required." });
    }

    // Create new task
    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() || "",
      status,
      priority,
      assignedTo: assignedTo?.trim() || "",
      dueDate,
      boardId,
      createdAt: createdAt || new Date().toISOString(),
      id: Date.now(), // if you're explicitly using this instead of _id
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Error in newTask:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const { boardId, userId } = req.query;

    // Build query object
    const query = {};
    if (boardId) query.boardId = boardId;
    if (userId) query.userId = userId;

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate task ID
    if (!id) {
      return res.status(400).json({ message: "Task ID is required." });
    }

    // Update task
    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate task ID
    if (!id) {
      return res.status(400).json({ message: "Task ID is required." });
    }

    // Delete task
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
