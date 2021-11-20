const Joi = require('joi');
function validateBrand(bean) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5).max(255).required(),
    imageUrl: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(bean);
}
exports.validate = validateBrand;