const Joi = require("joi");

const bet_schema = Joi.object({
  emailAddress: Joi.string().email().required(),
  betType: Joi.string().required(),
  betAmount: Joi.required(),
  choosenNumber: Joi.required(),
});

module.exports = bet_schema;
