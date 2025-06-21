const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"], // lowercase to match frontend
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"], // lowercase to match frontend
      default: "medium",
    },
    assignedTo: {
      type: String,
      trim: true,
    },
    dueDate: {
      type: Date,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    userId: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // includes createdAt & updatedAt
  }
);

module.exports = mongoose.model("Task", taskSchema);
