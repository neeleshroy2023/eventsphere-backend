const argon2 = require("argon2");
const User = require("../../database/models/user");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ user: existingUser });
    }

    const hashedPassword = await argon2.hash(password);
    const user = new User({ ...req.body, password: hashedPassword });

    const savedUser = await user.save();
    if (!savedUser) {
      return res.status(500).json({ error: "Error saving user." });
    }

    return res.status(200).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  createUser,
  loginUser,
};