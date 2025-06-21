// index.js
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;
const UserRoute = require("./routes/User");
const BoardRoute = require("./routes/Board.js");
const TaskRoute = require("./routes/Tasks.js");
const DB = require("./database/ConnectDB.js");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(UserRoute);
app.use(BoardRoute);
app.use(TaskRoute);

DB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Backend is running at http://:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
