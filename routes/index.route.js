const { Router } = require("express");
const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const ticketRouter = require("./ticket.route");

const router = Router();
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/ticket", ticketRouter);

module.exports = router;
