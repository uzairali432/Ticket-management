const Joi = require("joi");

const createTicketSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().max(2000).optional(),
  assignedTo: Joi.string().optional().regex(/^[0-9a-fA-F]{24}$/),
}).required();

module.exports = { createTicketSchema };
