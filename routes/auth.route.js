const { bodyValidator } = require("../middlewares/validation.middleware");
const { checkUserExists, authenticate, authorizeAdmin } = require("../middlewares/authorization.middleware");
const { signupSchema, loginSchema } = require("../validation/auth.validation");
const { AuthController } = require("../controllers/auth.controller");

const { Router } = require("express");
const router = Router();

router.post(
	"/sign-up",
	authenticate,
	authorizeAdmin,
	bodyValidator(signupSchema),
	checkUserExists,
	AuthController.signup,
);
router.post("/login", bodyValidator(loginSchema), AuthController.login);
router.post("/logout", authenticate, AuthController.logout);

module.exports = router;
