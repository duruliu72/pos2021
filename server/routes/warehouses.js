const express = require('express');
const router=express.Router();
const _ = require('lodash');
const {validate } = require("../models/warehouse");
const {getCon} = require("../dbCon");
router.get('/',(req, res) => {
    getCon().query("SELECT warehouseCode,warehouseName,warehouseAddress,isActive FROM warehouses",(err, warehouses)=>{
        if (err) throw err;
        res.send(warehouses);
    });
});
router.post("/", (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let warehouseCode = req.body.warehouseCode;
    let warehouseName = req.body.warehouseName;
    let country_id = req.body.country_id;
    let city_id = req.body.city_id;
    let warehouseAddress = req.body.warehouseAddress;
    let isActive=1;
    let isDeleted=0;
    let createdBy=10;
    let createdAt=new Date();
    let findSql='SELECT * FROM warehouses WHERE warehouseCode = ? && warehouseName=?';
    getCon().query(findSql,[warehouseCode,warehouseName],async function (err, result) {
        if (err) throw err;
        if(result.length > 0){
            return res.status(400).send("This warehouse already Exist.");
        }
        var sql = "INSERT INTO warehouses (warehouseCode,warehouseName,country_id,city_id,warehouseAddress,isActive,isDeleted,createdBy,createdAt) VALUES (?,?,?,?,?,?,?,?,?)";
        getCon().query(sql,[warehouseCode,warehouseName,country_id,city_id,warehouseAddress,isActive,isDeleted,createdBy,createdAt],function(err, result){
            if (err) throw err;
            getCon().query("SELECT * FROM warehouses WHERE id=?",[result.insertId], function (err, result, fields) {
                if (err) throw err;
                return res.send(_.pick(result[0], ["id", "warehouseCode", "warehouseName","warehouseAddress","isActive"]));
            });
        })
    })
})
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let warehouseid=req.params.id;
    let warehouseCode = req.body.warehouseCode;
    let warehouseName = req.body.warehouseName;
    let country_id = req.body.country_id;
    let city_id = req.body.city_id;
    let warehouseAddress = req.body.warehouseAddress;
    let isActive=1;
    let isDeleted=0;
    let updatedBy=10;
    let updatedAt=new Date();
    let findSql='SELECT * FROM warehouses WHERE id = ?';
    getCon().query(findSql,[warehouseid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The warehouse with the given ID was not found.');
        }
        let checkSql ='SELECT * FROM warehouses WHERE warehouseCode = ? && warehouseName = ? && NOT id=?';
        getCon().query(checkSql,[warehouseCode,warehouseName,warehouseid],function (err, result){
            if (err) throw err;
            if(result.length > 0){
                return res.status(400).send("This warehouse already Exist.");
            } 
            getCon().query("UPDATE warehouses SET warehouseCode = ?,warehouseName=?,country_id=?,city_id=?,warehouseAddress=?,isActive=?,isDeleted=?,updatedBy=?,updatedAt=? WHERE id = ?",[warehouseCode,warehouseName,country_id,city_id,warehouseAddress,isActive,isDeleted,updatedBy,updatedAt,warehouseid],function (err, result) {
                if (err) throw err;
                getCon().query("SELECT * FROM warehouses WHERE id=?",[warehouseid], function (err, result, fields) {
                    if (err) throw err;
                    return res.send(_.pick(result[0], ["id", "warehouseCode", "warehouseName","warehouseAddress","isActive"]));
                });
            });
        });
       
    })
  });
  router.delete('/:id', async (req, res) => {
    let warehouseid=req.params.id;
    let findSql='SELECT * FROM warehouses WHERE id = ?';
    getCon().query(findSql,[warehouseid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The warehouse with the given ID was not found.');
        }
        getCon().query("DELETE FROM warehouses WHERE id = ?",[warehouseid],function(err, brandres) {
            if (err) throw err;
            res.send(_.pick(result[0], ["id", "warehouseCode", "warehouseName","warehouseAddress","isActive"]));
        })
    })
  });
  router.get('/:id', async (req, res) => {
    let warehouseid=req.params.id;
    let findSql='SELECT * FROM warehouses WHERE id = ?';
    getCon().query(findSql,[warehouseid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The warehouse with the given ID was not found.');
        }
        res.send(_.pick(result[0], ["id", "warehouseCode", "warehouseName","warehouseAddress","isActive"]));
    })
  });  
module.exports = router;