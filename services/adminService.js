const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

async function authenticateAdmin(username, password) {
  if (!username || !password) {
    throw new Error("Missing credentials");
  }

  const user = await User.findOne({ username: username.toLowerCase() });
  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  console.log(JWT_SECRET_KEY);

  const token = jwt.sign(
    { userId: user._id, username: user.username },
    JWT_SECRET_KEY,
    {
      expiresIn: "30m",
    }
  );

  return token;
}

module.exports = {
  authenticateAdmin,
};
