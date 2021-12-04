const express = require('express');
const router=express.Router();
const _ = require('lodash');
const {validate } = require("../models/country");
const {getCon} = require("../dbCon");
router.get('/',(req, res) => {
    getCon().query("SELECT id,countryCode,countryName,isActive FROM countries ORDER BY id DESC",(err, countries)=>{
        if (err) throw err;
        res.send(countries);
    });
});
router.post("/", (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let countryCode = req.body.countryCode;
    let countryName = req.body.countryName;
    let isActive=1;
    let isDeleted=0;
    let createdBy=10;
    let createdAt=new Date();
    let findSql='SELECT * FROM countries WHERE countryCode = ? && countryName=?';
    getCon().query(findSql,[countryCode,countryName],async function (err, result) {
        if (err) throw err;
        if(result.length > 0){
            return res.status(400).send("This country name already Exist.");
        }
        var sql = "INSERT INTO countries (countryCode,countryName,isActive,isDeleted,createdBy,createdAt) VALUES (?,?,?,?,?,?)";
        getCon().query(sql,[countryCode,countryName,isActive,isDeleted,createdBy,createdAt],function(err, result){
            if (err) throw err;
            getCon().query("SELECT * FROM countries WHERE id=?",[result.insertId], function (err, result, fields) {
                if (err) throw err;
                return res.send(_.pick(result[0], ["id", "countryCode","countryName","isActive"]));
            });
        })
    })
})
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let countryid=req.params.id;
    let countryCode = req.body.countryCode;
    let countryName = req.body.countryName;
    let isActive=1;
    let isDeleted=0;
    let updatedBy=10;
    let updatedAt=new Date();
    let findSql='SELECT * FROM countries WHERE id = ?';
    getCon().query(findSql,[countryid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The country with the given ID was not found.');
        }
        let checkSql ='SELECT * FROM countries WHERE countryCode = ? && countryName = ? && NOT id=?';
        getCon().query(checkSql,[countryCode,countryName,countryid],function (err, result){
            if (err) throw err;
            if(result.length > 0){
                return res.status(400).send("This country name already Exist.");
            } 
            getCon().query("UPDATE countries SET countryCode = ?,countryName=?,isActive=?,isDeleted=?,updatedBy=?,updatedAt=? WHERE id = ?",[countryCode,countryName,isActive,isDeleted,updatedBy,updatedAt,countryid],function (err, result) {
                if (err) throw err;
                getCon().query("SELECT * FROM countries WHERE id=?",[countryid], function (err, result, fields) {
                    if (err) throw err;
                    return res.send(_.pick(result[0], ["id", "countryCode","countryName", "isActive"]));
                });
            });
        });
       
    })
  });
  router.delete('/:id', async (req, res) => {
    let countryid=req.params.id;
    let findSql='SELECT * FROM countries WHERE id = ?';
    getCon().query(findSql,[countryid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The country with the given ID was not found.');
        }
        getCon().query("DELETE FROM countries WHERE id = ?",[countryid],function(err, delres) {
            if (err) throw err;
            res.send(_.pick(result[0], ["id", "countryCode","countryName", "isActive"]));
        })
    })
  });
  router.get('/:id', async (req, res) => {
    let countryid=req.params.id;
    let findSql='SELECT * FROM countries WHERE id = ?';
    getCon().query(findSql,[countryid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The country with the given ID was not found.');
        }
        res.send(_.pick(result[0], ["id", "countryCode","countryName", "isActive"]));
    })
  });  
module.exports = router;