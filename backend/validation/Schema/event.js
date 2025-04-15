const Joi = require("joi");

const eventSchema = Joi.object({
  adminId: Joi.number().integer().required(),
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().required(),
  location: Joi.string().required(),
  role: Joi.array().items(Joi.any()).required(),
});

module.exports = { eventSchema };
