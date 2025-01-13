const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name should have a minimum length of 3 characters",
    "string.max": "Name should have a maximum length of 50 characters",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.email": "Email format is invalid",
  }),

  password: Joi.string().min(8).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "string.min": "Password should have a minimum length of 8 characters",
  }),

  avatar: Joi.string().uri().optional().messages({
    "string.base": "Avatar must be a string",
    "string.uri": "Avatar must be a valid URL",
  }),

  contactNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/) // Adjust the regex for your number format
    .required()
    .messages({
      "string.base": "Contact number must be a string",
      "string.pattern.base": "Contact number must be between 10 to 15 digits",
    }),

  skills: Joi.array().items(Joi.string().min(2).max(100)).required().messages({
    "array.base": "Skills must be an array of strings",
    "array.includesRequiredUnknowns": "Skills are required",
    "string.base": "Each skill must be a string",
    "string.min": "Each skill must have a minimum length of 2 characters",
    "string.max": "Each skill must have a maximum length of 100 characters",
  }),

  interests: Joi.array()
    .items(Joi.string().min(2).max(100))
    .required()
    .messages({
      "array.base": "Interests must be an array of strings",
      "array.includesRequiredUnknowns": "Interests are required",
      "string.base": "Each interest must be a string",
      "string.min": "Each interest must have a minimum length of 2 characters",
      "string.max":
        "Each interest must have a maximum length of 100 characters",
    }),

  experienceYears: Joi.number().integer().min(0).optional().messages({
    "number.base": "Experience years must be a number",
    "number.integer": "Experience years must be an integer",
    "number.min": "Experience years must be greater than or equal to 0",
  }),

  description: Joi.string().min(10).max(500).required().messages({
    "string.base": "Description must be a string",
    "string.min": "Description should have a minimum length of 10 characters",
    "string.max": "Description should have a maximum length of 500 characters",
  }),
});

module.exports = { userSchema };
