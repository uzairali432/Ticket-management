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

  static async createTicket(req, res) {
    try {
      const { title, description, assignedTo } = req.body;

      const ticket = new Ticket({
        title,
        description,
        createdBy: req.user.id,
        assignedTo: assignedTo || null,
        status: "open",
      });

      const savedTicket = await ticket.save();
      const populatedTicket = await savedTicket.populate(
        "createdBy assignedTo",
        "username email"
      );

      return res.status(201).json({
        message: "Ticket created successfully",
        ticket: populatedTicket,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = { TicketController };
