const Joi = require("joi");
const { eventSchema, updateEventSchema } = require("../Schema/event");
class eventValidation {
  async createEventValidation(req, res, next) {
    try {
      if (typeof req.body.role === "string") {
        try {
          req.body.role = JSON.parse(req.body.role);
        } catch (err) {
          return res.status(400).json({
            success: false,
            message: "Invalid format for role. Must be a valid JSON array.",
          });
        }
      }

      const result = eventSchema.validate(req.body);
      const { value, error } = result;
      console.log("error is: ", error);
      console.log("value is: ", value);
      const valid = !error;
      if (!valid) {
        console.log("errro in validatio:", error);
        const validationfailed = new Error(error.message);
        validationfailed.statusCode = 400;
        throw validationfailed;
      }
      next();
    } catch (error) {
      next(error);
    }
  }
  async updateEventValidation(req, res, next) {
    try {
      const { value, error } = updateEventSchema.validate(req.body);
      console.log("error is: ", error);
      if (error) {
        const validationError = new Error(error.message);
        validationError.statusCode = 400;
        throw validationError;
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}
const eventValidator = new eventValidation();
module.exports = eventValidator;
