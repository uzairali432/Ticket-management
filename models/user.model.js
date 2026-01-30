const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
});
// UserSchema.index({ email: 1 });
const User = model("user", UserSchema);
// User.createIndexes();
module.exports = User;
