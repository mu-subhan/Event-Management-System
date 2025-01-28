const Joi = require("joi");
const eventSchema = require("../Schema/event");
class eventValidation {
  async createEventValidation(req, res, next) {
    try {
      const result = eventSchema.validate(req.body);
      const { value, error } = result;
      const valid = !error;
      if (!valid) {
        const validationfailed = new Error(
          "Failed input validation Of create Event"
        );
        validationfailed.statusCode = 400;
        throw validationfailed;
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}
const eventValidator = new eventValidation();
module.exports = eventValidator;
