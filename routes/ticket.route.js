const { Router } = require("express");
const { TicketController } = require("../controllers/ticket.controller");
const { authenticate, authorizeAdmin } = require("../middlewares/authorization.middleware");
const { bodyValidator } = require("../middlewares/validation.middleware");
const { createTicketSchema, updateTicketSchema, assignTicketSchema, updateTicketStatusSchema } = require("../validation/ticket.validation");

const router = Router();

// User routes
router.get("/my", authenticate, TicketController.listMyTickets);

router.put(
  "/:id/status",
  authenticate,
  bodyValidator(updateTicketStatusSchema),
  TicketController.updateTicketStatus
);

// Admin routes
router.get("/", authenticate, authorizeAdmin, TicketController.listTickets);

router.post(
  "/",
  authenticate,
  authorizeAdmin,
  bodyValidator(createTicketSchema),
  TicketController.createTicket
);

router.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  bodyValidator(updateTicketSchema),
  TicketController.updateTicket
);

router.put(
  "/:id/assign",
  authenticate,
  authorizeAdmin,
  bodyValidator(assignTicketSchema),
  TicketController.assignTicket
);

module.exports = router;
