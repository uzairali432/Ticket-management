var jwt = require("jsonwebtoken");
const { Roles } = require("../shared/constants/roles.constant");
const User = require("../models/user.model");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  try {
    const decodedToken = jwt.verify(token, "secret");
    req.user = decodedToken;
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid Token" });
  }
  next();
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role != Roles.ADMIN)
    return res.status(403).json({ message: "Invalid Rights" });
  next();
};

const checkUserExists = async (req, res, next) => {
  try {
    const { email, username } = req.body;
    
    if (!email && !username) {
      return res.status(422).json({ message: "Email or username is required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { authenticate, authorizeAdmin, checkUserExists };
