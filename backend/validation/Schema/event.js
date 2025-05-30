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

const updateEventSchema = Joi.object({
  id: Joi.string().uuid().required(), // assuming event id is UUID
  adminId: Joi.number().integer(), // optional
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(10),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().required(),
  location: Joi.string().required(),
  role: Joi.array().items(Joi.any()),
  createdAt: Joi.date().iso().required(),
  updatedAt: Joi.date().iso().required(),
});

module.exports = { eventSchema, updateEventSchema };
