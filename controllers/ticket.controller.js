const Ticket = require("../models/ticket.model");

class TicketController {
  static async listTickets(req, res) {
    try {
      const tickets = await Ticket.find()
        .populate("createdBy", "username email")
        .populate("assignedTo", "username email");
      return res.json({ tickets });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = { TicketController };
