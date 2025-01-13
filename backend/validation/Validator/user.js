const { userSchema } = require("../Schema/user");
class userValidation {
  // thsivalidation function for refine-title route
  async createUserValidation(req, res, next) {
    try {
      console.log("uservalidation run! req.boy: ", req.body);

      const result = userSchema.validate(req.body);
      const { value, error } = result;

      const valid = !error;
      if (!valid) {
        console.error("Failed input validation Of Create User:", error);
        const validationfailed = new Error(
          "Failed input validation Of Refine User!"
        );
        validationfailed.statusCode = 400;
        throw validationfailed;
      }
      next();
    } catch (error) {
      console.error("Failed in validation:", error);
      next(error);
    }
  }
}

const userValidator = new userValidation();

module.exports = userValidator;
