const Joi = require('joi');
function validateCountry(bean) {
  const schema = Joi.object({
    countryCode: Joi.string().min(5).max(50).required(),
    countryName: Joi.string().min(5).max(50).required()
  });
  return schema.validate(bean);
}
exports.validate = validateCountry;