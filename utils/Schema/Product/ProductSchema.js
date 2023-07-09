const Joi = require("joi");

const product_schema = Joi.object({
  name: Joi.string().required(),
  price: Joi.required(),
  description: Joi.required(),
  category: Joi.required(),
  brand: Joi.required(),
  stock: Joi.required(),
  rating: Joi.required(),
});

module.exports = product_schema;
