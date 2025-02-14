const Joi = require("joi");

class EventRoleValidator {
  // ✅ Validate Create Event Role
  validateCreate(req, res, next) {
    console.log("validation run!");
    const schema = Joi.object({
      event_id: Joi.string().required(),
      role_name: Joi.string().min(3).max(50).required(),
      skills: Joi.array().items(Joi.string()).required(),
      description: Joi.string().optional(),
      volunteers: Joi.array().items(Joi.number()).optional(),
    });

    EventRoleValidator.#validateRequest(req, res, next, schema);
  }

  // ✅ Validate Update Event Role
  static validateUpdate(req, res, next) {
    const schema = Joi.object({
      role_name: Joi.string().min(3).max(50).optional(),
      skills: Joi.array().items(Joi.string()).optional(),
      description: Joi.string().optional(),
      volunteers: Joi.array().items(Joi.number()).optional(),
    });

    EventRoleValidator.#validateRequest(req, res, next, schema);
  }

  // ✅ Validate Get/Delete Event Role by ID
  static validateIdParam(req, res, next) {
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    EventRoleValidator.#validateRequest(req.params, res, next, schema);
  }

  // ✅ Private Method to Validate Requests
  static #validateRequest(data, res, next, schema) {
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });
    }

    next();
  }
}
const eventRoleValidator = new EventRoleValidator();
module.exports = eventRoleValidator;
