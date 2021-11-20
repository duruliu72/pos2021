const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require('lodash');
const { generateAuthToken, validate } = require("../models/user");
const {getCon} = require("../dbCon");
router.post("/", (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let role_id = req.body.role_id;
    let findUsersql='SELECT * FROM users WHERE email = ?';
    getCon().query(findUsersql,[email],async function (err, result) {
        if (err) throw err;
        if(result.length > 0){
            return res.status(400).send("User already registered.");
        }
        var sql = "INSERT INTO users (username, email,password,role_id) VALUES (?,?,?,?)";
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        getCon().query(sql,[username,email,password,role_id],function(err, result){
            if (err) throw err;
            getCon().query("SELECT * FROM users WHERE id=?",[result.insertId], function (err, result, fields) {
                if (err) throw err;
                const token= generateAuthToken(_.pick(result[0], ["id", "username", "email"]));
                return res.header("x-auth-token", token).send(_.pick(result[0], ["id", "username", "email"]));
            });
        });
    });
});
module.exports = router;