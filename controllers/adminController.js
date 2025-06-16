const { authenticateAdmin } = require("../services/adminService");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const token = await authenticateAdmin(username, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

exports.me = async (req, res) => {
  res.json({
    _id: req.user.userId,
    username: req.user.username,
  });
};
