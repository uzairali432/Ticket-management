const User = require("../models/user.model");
const { getHashedPwd } = require("../services/auth.service");
const { Roles } = require("../shared/constants/roles.constant");

class UserController {
  static async addUser(req, res) {
    const data = req.body;
    const password = getHashedPwd(data.password);
    const user = new User({ ...data, password, role: Roles.USER });
    await user.save();
    return res.json({ message: "User added successfully" }).status(201);
  }
}

module.exports = { UserController };
