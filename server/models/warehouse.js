const Joi = require('joi');
function validateBrand(bean) {
  const schema = Joi.object({
    warehouseCode: Joi.string().min(5).max(50).required(),
    warehouseName: Joi.string().min(5).max(50).required(),
    country_id: Joi.number().integer().required(),
    city_id: Joi.number().integer().required(),
    warehouseAddress: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(bean);
}
exports.validate = validateBrand;