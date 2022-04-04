const Joi = require('joi');
function validateBrand(bean) {
  const schema = Joi.object({
    warehouseName: Joi.string().min(5).max(50).required().label("Warehouse Name"),
    warehouseCode: Joi.string().min(5).max(50).required().label("Warehouse Code"),
    country_id: Joi.number().integer().required().label("Country"),
    city_id: Joi.number().integer().required().label("City"),
    warehouseAddress: Joi.string().min(5).max(50).required().label("Warehouse Address"),
  });
  return schema.validate(bean);
}
exports.validate = validateBrand;