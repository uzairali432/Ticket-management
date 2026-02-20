const { Router } = require("express");
const { TicketController } = require("../controllers/ticket.controller");
const { authenticate, authorizeAdmin } = require("../middlewares/authorization.middleware");
const { bodyValidator } = require("../middlewares/validation.middleware");
const { createTicketSchema } = require("../validation/ticket.validation");

const router = Router();

router.get("/", authenticate, authorizeAdmin, TicketController.listTickets);

router.post(
  "/",
  authenticate,
  authorizeAdmin,
  bodyValidator(createTicketSchema),
  TicketController.createTicket
);

module.exports = router;
