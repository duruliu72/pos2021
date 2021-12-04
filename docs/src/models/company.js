import Joi from "joi-browser";
const model = {
    companyCode: Joi.string().required().label("Company Code"),
    companyName: Joi.string().required().label("Company Name"),
    companyCountry: Joi.string().required().label("Company Country"),
    companyCity: Joi.string().required().label("Company City"),
    companyAddress: Joi.string().required().label("Company Address"),
    companyEmail: Joi.string().required().label("Company Email"),
    companyPhone: Joi.string().required().label("Company Phone"),
    description: Joi.string().required().label("Description"),
};
export var validate = (data) => {
    let schema = Joi.object(model);
    let options = { abortEarly: false };
    let result = schema.validate(data, options);
    if (!result.error) return null;
    var errors = {};
    for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
    }
    return errors;
}
export function validateProperty({ name, value }) {
    const obj = { [name]: value };
    let schema = Joi.object({
        [name]: model[name]
    });
    let result = schema.validate(obj);
    const { error } = result;
    if (!error) return null;
    return error.details[0].message;
}