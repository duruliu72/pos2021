const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { generateAuthToken } = require("../models/user");
const {getCon} = require("../dbCon");

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let findUsersql='SELECT * FROM users WHERE email = ?';
    getCon().query(findUsersql,[req.body.email],async function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(400).send('Invalid email or password.');
        }
        const validPassword =  await bcrypt.compare(req.body.password, result[0].password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');
        const token= generateAuthToken(_.pick(result[0], ["id", "username", "email"]));
        res.send(token);
    });
});

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
}
module.exports = router; 