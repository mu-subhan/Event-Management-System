const Joi = require("joi");

const eventSchema = Joi.object({
  adminId: Joi.number().integer().required(),
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  date: Joi.date().iso().required(),
  time: Joi.date().iso().required(),
  location: Joi.string().required(),
  status: Joi.string()
    .valid("PENDING", "APPROVED", "REJECTED")
    .default("PENDING"),
});

module.exports = { eventSchema };
