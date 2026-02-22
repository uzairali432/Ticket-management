const Joi = require("joi");

const createTicketSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().max(2000).optional(),
  assignedTo: Joi.string().optional().regex(/^[0-9a-fA-F]{24}$/),
}).required();

const updateTicketSchema = Joi.object({
  title: Joi.string().min(3).max(200).optional(),
  description: Joi.string().max(2000).optional(),
  status: Joi.string().valid("open", "in_progress", "closed").optional(),
  assignedTo: Joi.string().optional().regex(/^[0-9a-fA-F]{24}$/).allow(null),
}).required();

const assignTicketSchema = Joi.object({
  assignedTo: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
}).required();

module.exports = { createTicketSchema, updateTicketSchema, assignTicketSchema };
