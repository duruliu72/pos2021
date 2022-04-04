const express = require('express');
const router=express.Router();
const _ = require('lodash');
const {validate } = require("../models/supplier");
const {getCon} = require("../dbCon");
router.get('/',(req, res) => {
    getCon().query(`SELECT suppliers.id,supplierName,email,phone,countries.countryName,cities.cityName,country_id,city_id,supplierAddress,suppliers.isActive 
    FROM suppliers
    INNER JOIN countries ON countries.id=suppliers.country_id
    INNER JOIN cities ON cities.id=suppliers.city_id 
    ORDER BY suppliers.id DESC`,(err, result)=>{
        if (err) throw err;
        res.send(result);
    });
});
router.post("/", (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let supplierName = req.body.supplierName;
    let email = req.body.email;
    let phone = req.body.phone;
    let country_id = req.body.country_id;
    let city_id = req.body.city_id;
    let supplierAddress = req.body.supplierAddress;
    let isActive=1;
    let isDeleted=0;
    let createdBy=10;
    let createdAt=new Date();
    let findSql='SELECT * FROM suppliers WHERE email = ?';
    getCon().query(findSql,[email],async function (err, result) {
        if (err) throw err;
        if(result.length > 0){
            return res.status(400).send("This supplier already Exist.");
        }
        var sql = "INSERT INTO suppliers (supplierName,email,phone,country_id,city_id,supplierAddress,isActive,isDeleted,createdBy,createdAt) VALUES (?,?,?,?,?,?,?,?,?,?)";
        getCon().query(sql,[supplierName,email,phone,country_id,city_id,supplierAddress,isActive,isDeleted,createdBy,createdAt],function(err, result){
            if (err) throw err;
            getCon().query(`SELECT suppliers.id,supplierName,email,phone,countries.countryName,cities.cityName,country_id,city_id,supplierAddress,suppliers.isActive 
            FROM suppliers
            INNER JOIN countries ON countries.id=suppliers.country_id
            INNER JOIN cities ON cities.id=suppliers.city_id WHERE suppliers.id=?`,[result.insertId], function (err, result, fields) {
                if (err) throw err;
                return res.send(_.pick(result[0], ["id", "supplierName", "email","phone","countryName","cityName","country_id","city_id","supplierAddress","isActive"]));
            });
        })
    })
})
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let supplierid=req.params.id;
    let supplierName = req.body.supplierName;
    let email = req.body.email;
    let phone = req.body.phone;
    let country_id = req.body.country_id;
    let city_id = req.body.city_id;
    let supplierAddress = req.body.supplierAddress;
    let isActive=1;
    let isDeleted=0;
    let updatedBy=10;
    let updatedAt=new Date();
    let findSql='SELECT * FROM suppliers WHERE id = ?';
    getCon().query(findSql,[supplierid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The supplier with the given ID was not found.');
        }
        let checkSql ='SELECT * FROM suppliers WHERE email = ? && NOT id=?';
        getCon().query(checkSql,[email,supplierid],function (err, result){
            if (err) throw err;
            if(result.length > 0){
                return res.status(400).send("This supplier already Exist.");
            } 
            getCon().query("UPDATE suppliers SET supplierName = ?,email=?,phone = ?,country_id=?,city_id=?,supplierAddress=?,isActive=?,isDeleted=?,updatedBy=?,updatedAt=? WHERE id = ?",[supplierName,email,phone,country_id,city_id,supplierAddress,isActive,isDeleted,updatedBy,updatedAt,supplierid],function (err, result) {
                if (err) throw err;
                getCon().query(`SELECT suppliers.id,supplierName,email,phone,countries.countryName,cities.cityName,country_id,city_id,supplierAddress,suppliers.isActive 
                FROM suppliers
                INNER JOIN countries ON countries.id=suppliers.country_id
                INNER JOIN cities ON cities.id=suppliers.city_id WHERE suppliers.id=?`,[supplierid], function (err, result, fields) {
                    if (err) throw err;
                    return res.send(_.pick(result[0], ["id", "supplierName", "email","phone","countryName","cityName","country_id","city_id","supplierAddress","isActive"]));
                });
            });
        });
       
    })
  });
  router.delete('/:id', async (req, res) => {
    let supplierid=req.params.id;
    let findSql=`SELECT suppliers.id,supplierName,email,phone,countries.countryName,cities.cityName,country_id,city_id,supplierAddress,suppliers.isActive 
    FROM suppliers
    INNER JOIN countries ON countries.id=suppliers.country_id
    INNER JOIN cities ON cities.id=suppliers.city_id WHERE suppliers.id=?`;
    getCon().query(findSql,[supplierid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The supplier with the given ID was not found.');
        }
        getCon().query("DELETE FROM suppliers WHERE id = ?",[supplierid],function(err, delres) {
            if (err) throw err;
            res.send(_.pick(result[0], ["id", "supplierName", "email","phone","countryName","cityName","country_id","city_id","supplierAddress","isActive"]));
        })
    })
  });
  router.get('/:id', async (req, res) => {
    let supplierid=req.params.id;
    let findSql=`SELECT suppliers.id,supplierName,email,phone,countries.countryName,cities.cityName,country_id,city_id,supplierAddress,suppliers.isActive 
    FROM suppliers
    INNER JOIN countries ON countries.id=suppliers.country_id
    INNER JOIN cities ON cities.id=suppliers.city_id WHERE suppliers.id=?`;
    getCon().query(findSql,[supplierid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The supplier with the given ID was not found.');
        }
        res.send(_.pick(result[0], ["id", "supplierName", "email","phone","countryName","cityName","country_id","city_id","supplierAddress","isActive"]));
    })
  });  
module.exports = router;