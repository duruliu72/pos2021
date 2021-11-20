const jwt = require('jsonwebtoken');
const Joi = require('joi');
function generateAuthToken({id,username,email}) {
  const token = jwt.sign({
    _id: id,
    username: username,
    email:email
  }, "talha");
  return token;
}
exports.generateAuthToken = generateAuthToken;
function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    role_id: Joi.number().min(1).max(50).required()
  });
  return schema.validate(user);
}
exports.validate = validateUser;