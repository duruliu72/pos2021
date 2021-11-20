const express = require('express');
const router=express.Router();
const _ = require('lodash');
const {validate } = require("../models/gender");
const {getCon} = require("../dbCon");
router.get('/',(req, res) => {
    getCon().query("SELECT id,name,isActive FROM genders",(err, genders)=>{
        if (err) throw err;
        res.send(genders);
    });
});
router.post("/", (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let name = req.body.name;
    let isActive=1;
    let isDeleted=0;
    let createdBy=10;
    let createdAt=new Date();
    let findBrandSql='SELECT * FROM genders WHERE name = ?';
    getCon().query(findBrandSql,[name],async function (err, result) {
        if (err) throw err;
        if(result.length > 0){
            return res.status(400).send("This gender name already Exist.");
        }
        var sql = "INSERT INTO genders (name,isActive,isDeleted,createdBy,createdAt) VALUES (?,?,?,?,?)";
        getCon().query(sql,[name,isActive,isDeleted,createdBy,createdAt],function(err, result){
            if (err) throw err;
            getCon().query("SELECT * FROM genders WHERE id=?",[result.insertId], function (err, result, fields) {
                if (err) throw err;
                return res.send(_.pick(result[0], ["id", "name","isActive"]));
            });
        })
    })
})
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let genderid=req.params.id;
    let name = req.body.name;
    let isActive=1;
    let isDeleted=0;
    let updatedBy=10;
    let updatedAt=new Date();
    let findSql='SELECT * FROM genders WHERE id = ?';
    getCon().query(findSql,[genderid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The gender with the given ID was not found.');
        }
        let checkSql ='SELECT * FROM genders WHERE name = ? && NOT id=?';
        getCon().query(checkSql,[name,genderid],function (err, result){
            if (err) throw err;
            if(result.length > 0){
                return res.status(400).send("This gender name already Exist.");
            } 
            getCon().query("UPDATE genders SET name = ?,isActive=?,isDeleted=?,updatedBy=?,updatedAt=? WHERE id = ?",[name,isActive,isDeleted,updatedBy,updatedAt,genderid],function (err, result) {
                if (err) throw err;
                getCon().query("SELECT * FROM genders WHERE id=?",[genderid], function (err, result, fields) {
                    if (err) throw err;
                    return res.send(_.pick(result[0], ["id", "name", "isActive"]));
                });
            });
        });
       
    })
  });
  router.delete('/:id', async (req, res) => {
    let genderid=req.params.id;
    let findBrandSql='SELECT * FROM genders WHERE id = ?';
    getCon().query(findBrandSql,[genderid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The gender with the given ID was not found.');
        }
        getCon().query("DELETE FROM genders WHERE id = ?",[genderid],function(err, brandres) {
            if (err) throw err;
            res.send(_.pick(result[0], ["id", "name", "isActive"]));
        })
    })
  });
  router.get('/:id', async (req, res) => {
    let genderid=req.params.id;
    let findSql='SELECT * FROM genders WHERE id = ?';
    getCon().query(findSql,[genderid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The gender with the given ID was not found.');
        }
        res.send(_.pick(result[0], ["id", "name", "isActive"]));
    })
  });  
module.exports = router;