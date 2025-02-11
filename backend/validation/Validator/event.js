const Joi = require("joi");
const { eventSchema } = require("../Schema/event");
class eventValidation {
  async createEventValidation(req, res, next) {
    try {
      const result = eventSchema.validate(req.body);
      const { value, error } = result;
      console.log("error is: ", error);
      console.log("value is: ", value);
      const valid = !error;
      if (!valid) {
        const validationfailed = new Error(error.message);
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
