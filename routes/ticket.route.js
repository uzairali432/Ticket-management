const { Router } = require("express");
const { TicketController } = require("../controllers/ticket.controller");
const { authenticate, authorizeAdmin } = require("../middlewares/authorization.middleware");

const router = Router();

router.get("/", authenticate, authorizeAdmin, TicketController.listTickets);

module.exports = router;
