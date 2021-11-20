const Joi = require('joi');
function validateCity(bean) {
  const schema = Joi.object({
    cityCode: Joi.string().min(5).max(50).required(),
    cityName: Joi.string().min(5).max(50).required()
  });
  return schema.validate(bean);
}
exports.validate = validateCity;