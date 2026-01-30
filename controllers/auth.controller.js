const User = require("../models/user.model");
const {
  getHashedPwd,
  checkIfPasswordMatched,
  generateToken,
} = require("../services/auth.service");

const bcrypt = require("bcrypt");
const { Roles } = require("../shared/constants/roles.constant");

class AuthController {
  static async signup(req, res) {
    const data = req.body;
    const password = getHashedPwd(data.password);
    const user = new User({ ...data, password, role: Roles.ADMIN });
    await user.save();
    return res.json({ message: "signup Successfully" }).status(201);
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: "Invalid Credentials" });

    const isPasswordCorrect = checkIfPasswordMatched(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid Credentials" });

    const { password: userPassword, ...userData } = user;
    const accessToken = generateToken(userData._doc);

    return res
      .json({ message: "login Successfully", data: { accessToken } })
      .status(201);
  }
}

module.exports = { AuthController };
