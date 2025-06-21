const Board = require("../models/Board");

exports.addBoard = async (req, res, next) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Board name is required" });
  }

  try {
    const newBoard = await Board.create({ name });
    res.status(201).json({
      message: "Board created successfully",
      board: newBoard,
    });
  } catch (error) {
    console.error("Error creating board:", error);
    res.status(500).json({
      message: "Failed to create board",
      error: error.message,
    });
  }
};

exports.getBoard = async (req, res, next) => {
  //   console.log("get");
  try {
    const boards = await Board.find({});
    res.status(200).json({
      message: "Boards retrieved successfully",
      boards: boards,
    });
  } catch (error) {
    console.error("Error fetching boards:", error);
    res.status(500).json({
      message: "Failed to fetch boards",
      error: error.message,
    });
  }
};

// exports.getBoardById = async (req, res, next) => {
//   try {
//     const board = await Board.findById(req.params.id);
//     if (!board) {
//       return res.status(404).json({ message: "Board not found" });
//     }
//     res.status(200).json({
//       message: "Board retrieved successfully",
//       board: board,
//     });
//   } catch (error) {
//     console.error("Error fetching board:", error);
//     res.status(500).json({
//       message: "Failed to fetch board",
//       error: error.message,
//     });
//   }
// };

// In your board controller file
exports.deleteBoard = async (req, res, next) => {
  try {
    const board = await Board.findByIdAndDelete(req.params.id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    console.error("Error deleting board:", error);
    res.status(500).json({
      message: "Failed to delete board",
      error: error.message,
    });
  }
};

exports.updateBoard = async (req, res, next) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Board name is required" });
  }

  try {
    const updatedBoard = await Board.findByIdAndUpdate(
      req.params.id,
      { name: name.trim() },
      { new: true } // Return the updated document
    );

    if (!updatedBoard) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.status(200).json({
      message: "Board updated successfully",
      board: updatedBoard,
    });
  } catch (error) {
    console.error("Error updating board:", error);
    res.status(500).json({
      message: "Failed to update board",
      error: error.message,
    });
  }
};
