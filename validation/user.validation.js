const Joi = require("joi");
const { PasswordPattern } = require("../shared/regex/index.regex");

const addUserSchema = Joi.object({
  username: Joi.string().min(3).max(50).alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(PasswordPattern)
    .message({
      "string.pattern.base":
        "Password must be included 1 special character, 1 digit, 1 capital, 1 small",
    })
    .required(),
}).required();

module.exports = { addUserSchema };
