const { bodyValidator } = require("../middlewares/validation.middleware");
const { checkUserExists } = require("../middlewares/authorization.middleware");
const { signupSchema } = require("../validation/auth.validation");
const { AuthController } = require("../controllers/auth.controller");

const { Router } = require("express");
const { loginSchema } = require("../../backend-02/validators/validator");
const router = Router();

router.post("/sign-up", bodyValidator(signupSchema), checkUserExists, AuthController.signup);
router.post("/login", bodyValidator(loginSchema), AuthController.login);

module.exports = router;
