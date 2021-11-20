const express = require('express');
const router=express.Router();
const _ = require('lodash');
const {validate } = require("../models/company");
const {getCon} = require("../dbCon");
router.get('/',(req, res) => {
    getCon().query("SELECT companyCode,companyName,companyCountry,companyCity,companyAddress,companyEmail,companyPhone FROM company",(err, categories)=>{
        if (err) throw err;
        res.send(categories);
    });
});
router.post("/", (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let companyCode = req.body.companyCode;
    let companyName = req.body.companyName;
    let companyCountry = req.body.companyCountry;
    let companyCity = req.body.companyCity;
    let companyAddress = req.body.companyAddress;
    let companyEmail = req.body.companyEmail;
    let companyPhone = req.body.companyPhone;
    let createdAt=new Date();
    let findSql='SELECT * FROM company WHERE companyCode = ? && companyName=?';
    getCon().query(findSql,[companyCode,companyName],async function (err, result) {
        if (err) throw err;
        if(result.length > 0){
            return res.status(400).send("This company already Exist.");
        }
        var sql = "INSERT INTO company (companyCode,companyName,companyCountry,companyCity,companyAddress,companyEmail,companyPhone,createdAt) VALUES (?,?,?,?,?,?,?,?)";
        getCon().query(sql,[companyCode,companyName,companyCountry,companyCity,companyAddress,companyEmail,companyPhone,createdAt],function(err, result){
            if (err) throw err;
            getCon().query("SELECT * FROM company WHERE id=?",[result.insertId], function (err, result, fields) {
                if (err) throw err;
                return res.send(_.pick(result[0], ["id", "companyCode", "companyName","companyCountry","companyCity","companyAddress","companyEmail","companyPhone"]));
            });
        })
    })
})
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let companyid=req.params.id;
    let companyCode = req.body.companyCode;
    let companyName = req.body.companyName;
    let companyCountry = req.body.companyCountry;
    let companyCity = req.body.companyCity;
    let companyAddress = req.body.companyAddress;
    let companyEmail = req.body.companyEmail;
    let companyPhone = req.body.companyPhone;
    let updatedAt=new Date();
    let findSql='SELECT * FROM company WHERE id = ?';
    getCon().query(findSql,[companyid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The company with the given ID was not found.');
        }
        let checkSql ='SELECT * FROM company WHERE companyCode = ? && companyName=? && NOT id=?';
        getCon().query(checkSql,[companyCode,companyName,companyid],function(err, result){ 
            if (err) throw err;
            if(result.length > 0){
                return res.status(400).send("This company already Exist.");
            }
            getCon().query("UPDATE company SET companyCode = ?,companyName=?,companyCountry=?,companyCity=?,companyAddress=?,companyEmail=?,companyPhone=?,updatedAt=? WHERE id = ?",[companyCode,companyName,companyCountry,companyCity,companyAddress,companyEmail,companyPhone,updatedAt,companyid],function (err, result) {
                if (err) throw err;
                getCon().query("SELECT * FROM company WHERE id=?",[companyid], function (err, result, fields) {
                    if (err) throw err;
                    return res.send(_.pick(result[0], ["id", "companyCode", "companyName","companyCountry","companyCity","companyAddress","companyEmail","companyPhone"]));
                });
            });
        });
    })
  });
  router.delete('/:id', async (req, res) => {
    let companyid=req.params.id;
    let findSql='SELECT * FROM company WHERE id = ?';
    getCon().query(findSql,[companyid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The company with the given ID was not found.');
        }
        getCon().query("DELETE FROM company WHERE id = ?",[companyid],function(err, brandres) {
            if (err) throw err;
            res.send(_.pick(result[0], ["id", "companyCode", "companyName","companyCountry","companyCity","companyAddress","companyEmail","companyPhone"]));
        })
    })
  });
  router.get('/:id', async (req, res) => {
    let companyid=req.params.id;
    let findSql='SELECT * FROM company WHERE id = ?';
    getCon().query(findSql,[companyid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The company with the given ID was not found.');
        }
        res.send(_.pick(result[0], ["id", "companyCode", "companyName","companyCountry","companyCity","companyAddress","companyEmail","companyPhone"]));
    })
  });  
module.exports = router;