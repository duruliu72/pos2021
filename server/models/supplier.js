const Joi = require('joi');
function validate(bean) {
  const schema = Joi.object({
    supplierName: Joi.string().required().label("Supplier Name"),
    email: Joi.string().required().label("Email"),
    phone: Joi.string().required().label("Phone"),
    country_id: Joi.number().integer().required().label("Country"),
    city_id: Joi.number().integer().required().label("City"),
    supplierAddress: Joi.string().required().label("Supplier Address"),
  });
  return schema.validate(bean);
}
exports.validate = validate;