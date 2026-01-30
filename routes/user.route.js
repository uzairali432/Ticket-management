const { bodyValidator } = require("../middlewares/validation.middleware");

const { Router } = require("express");
const { UserController } = require("../controllers/user.controller");
const { addUserSchema } = require("../validation/user.validation");
const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authorization.middleware");
const router = Router();

router.post(
  "/",
  authenticate,
  authorizeAdmin,
  bodyValidator(addUserSchema),
  UserController.addUser,
);

module.exports = router;
