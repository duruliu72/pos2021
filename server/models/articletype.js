const Joi = require('joi');
function validateGender(bean) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required()
  });
  return schema.validate(bean);
}
exports.validate = validateGender;