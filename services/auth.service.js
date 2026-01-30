const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const getHashedPwd = (plainPwd, saltRounds = 10) => {
  console.log(saltRounds, plainPwd);
  const hash = bcrypt.hashSync(plainPwd, saltRounds);

  return hash;
};

const checkIfPasswordMatched = (plainPwd, hashedPassword) => {
  const isMatched = bcrypt.compareSync(plainPwd, hashedPassword);

  return isMatched;
};

const generateToken = (data, expiresIn = "1d") => {
  var token = jwt.sign(data, "secret", { expiresIn });
  return token;
};

module.exports = { getHashedPwd, checkIfPasswordMatched, generateToken };
