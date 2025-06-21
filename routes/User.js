const express = require("express");
const router = express.Router();

const { loginUser, postSignup } = require("../controller/User");

router.post("/login", loginUser);
router.post("/signup", postSignup);

module.exports = router;
