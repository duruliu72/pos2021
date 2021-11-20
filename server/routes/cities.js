const express = require('express');
const router=express.Router();
const _ = require('lodash');
const {validate } = require("../models/city");
const {getCon} = require("../dbCon");
router.get('/',(req, res) => {
    getCon().query("SELECT id,cityCode,cityName,isActive FROM cities",(err, cities)=>{
        if (err) throw err;
        res.send(cities);
    });
});
router.post("/", (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let cityCode = req.body.cityCode;
    let cityName = req.body.cityName;
    let isActive=1;
    let isDeleted=0;
    let createdBy=10;
    let createdAt=new Date();
    let findSql='SELECT * FROM cities WHERE cityCode = ? && cityName = ?';
    getCon().query(findSql,[cityCode,cityName],async function (err, result) {
        if (err) throw err;
        if(result.length > 0){
            return res.status(400).send("This city name already Exist.");
        }
        var sql = "INSERT INTO cities (cityCode,cityName,isActive,isDeleted,createdBy,createdAt) VALUES (?,?,?,?,?,?)";
        getCon().query(sql,[cityCode,cityName,isActive,isDeleted,createdBy,createdAt],function(err, result){
            if (err) throw err;
            getCon().query("SELECT * FROM cities WHERE id=?",[result.insertId], function (err, result, fields) {
                if (err) throw err;
                return res.send(_.pick(result[0], ["id", "cityCode","cityName","isActive"]));
            });
        })
    })
})
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let cityid=req.params.id;
    let cityCode = req.body.cityCode;
    let cityName = req.body.cityName;
    let isActive=1;
    let isDeleted=0;
    let updatedBy=10;
    let updatedAt=new Date();
    let findSql='SELECT * FROM cities WHERE id = ?';
    getCon().query(findSql,[cityid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The city with the given ID was not found.');
        }
        let checkSql ='SELECT * FROM cities WHERE cityCode = ? && cityName = ? && NOT id=?';
        getCon().query(checkSql,[cityCode,cityName,cityid],function (err, result){
            if (err) throw err;
            if(result.length > 0){
                return res.status(400).send("This city name already Exist.");
            } 
            getCon().query("UPDATE cities SET cityCode = ?,cityName = ?,isActive=?,isDeleted=?,updatedBy=?,updatedAt=? WHERE id = ?",[cityCode,cityName,isActive,isDeleted,updatedBy,updatedAt,cityid],function (err, result) {
                if (err) throw err;
                getCon().query("SELECT * FROM cities WHERE id=?",[cityid], function (err, result, fields) {
                    if (err) throw err;
                    return res.send(_.pick(result[0], ["id", "cityCode","cityName","isActive"]));
                });
            });
        });
       
    })
  });
  router.delete('/:id', async (req, res) => {
    let cityid=req.params.id;
    let findSql='SELECT * FROM cities WHERE id = ?';
    getCon().query(findSql,[cityid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The city with the given ID was not found.');
        }
        getCon().query("DELETE FROM cities WHERE id = ?",[cityid],function(err, delres) {
            if (err) throw err;
            res.send(_.pick(result[0], ["id", "cityCode","cityName","isActive"]));
        })
    })
  });
  router.get('/:id', async (req, res) => {
    let cityid=req.params.id;
    let findSql='SELECT * FROM cities WHERE id = ?';
    getCon().query(findSql,[cityid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The city with the given ID was not found.');
        }
        res.send(_.pick(result[0], ["id", "cityCode","cityName","isActive"]));
    })
  });  
module.exports = router;