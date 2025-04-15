const { userSchema } = require("../Schema/user");
class userValidation {
  // thsivalidation function for refine-title route
  async createUserValidation(req, res, next) {
    try {
      console.log("uservalidation run! req.boy: ", req.body);
      // const input = await JSON.parse(req.body);
      // console.log("input is: ", input);
      req.body.skills = JSON.parse(req.body.skills);
      req.body.interests = JSON.parse(req.body.interests);

      const result = userSchema.validate(req.body);
      const { value, error } = result;

      const valid = !error;
      if (!valid) {
        console.error("Failed input validation Of Create User:", error);
        console.log("error.details[0]: ", error.details[0]);
        const validationfailed = new Error(error.details[0].message);
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
