const express = require("express");
const router = express.Router();

const {
  addBoard,
  getBoard,
  deleteBoard,
  updateBoard,
} = require("../controller/Board");

router.post("/addboard", addBoard);
router.get("/getboard", getBoard);
// router.get("/:id", getBoardById);
// Backend routes (in your server file)
router.delete("/deleteboard/:id", deleteBoard);
router.put("/updateboard/:id", updateBoard);

module.exports = router;
