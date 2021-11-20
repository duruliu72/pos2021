const Joi = require('joi');
function validateCompany(bean) {
  const schema = Joi.object({
    companyCode: Joi.string().min(5).max(50).required(),
    companyName: Joi.string().min(5).max(50).required(),
    companyCountry: Joi.string().min(5).max(50).required(),
    companyCity: Joi.string().min(5).max(50).required(),
    companyAddress: Joi.string().min(5).max(50).required(),
    companyEmail: Joi.string().min(5).max(50).required(),
    companyPhone: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(bean);
}
exports.validate = validateCompany;