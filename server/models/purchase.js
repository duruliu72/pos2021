const Joi = require('joi');
function validate(bean) {
  const schema = Joi.object({
    purchase_invoice: Joi.string().required().label("Purchase invoice"),
    company_id: Joi.number().integer().required().label("Company"),
    warehouse_id: Joi.number().integer().required().label("Supplier"),
    supplier_id: Joi.number().integer().required().label("Warehouse"),
    description: Joi.string().label("Description"),
    purchase_date: Joi.date().required().label("Date"),
  });
  return schema.validate(bean);
}
exports.validate = validate;