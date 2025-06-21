const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.postSignup = async (req, res, next) => {
  const { name, email, password } = req.body;

  //1 Check userexists or not
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(403).json({ message: "User Already Exits" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
  //2 Hashing the password
  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 8);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
  try {
    await User.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(200).json({ success: true, message: "Account Created" });
  } catch (error) {
    res.status(500).json({ message: "internal Server Error", error });
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password, name } = req.body;
  //   console.log(email, password, name);

  const user = await User.findOne({ email });
  try {
    if (!user) {
      return res.status(200).json({ message: "User not exists" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }

  try {
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(200).json({ message: "Invaild email or password" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
  res.status(200).json({ success: true, message: "Login Successful" });
  //   res.send("Hello");
};
