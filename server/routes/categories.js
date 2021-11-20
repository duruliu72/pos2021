const express = require('express');
const router=express.Router();
const _ = require('lodash');
const {validate } = require("../models/category");
const {getCon} = require("../dbCon");
router.get('/',(req, res) => {
    getCon().query("SELECT name,description,imageUrl,isActive FROM category",(err, categories)=>{
        if (err) throw err;
        res.send(categories);
    });
});
router.post("/", (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let name = req.body.name;
    let description = req.body.description;
    let imageUrl = req.body.imageUrl;
    let isActive=1;
    let isDeleted=0;
    let createdBy=10;
    let createdAt=new Date();
    let findSql='SELECT * FROM category WHERE name = ?';
    getCon().query(findSql,[name],async function (err, result) {
        if (err) throw err;
        if(result.length > 0){
            return res.status(400).send("This category name already Exist.");
        }
        var sql = "INSERT INTO category (name,description,imageUrl,isActive,isDeleted,createdBy,createdAt) VALUES (?,?,?,?,?,?,?)";
        getCon().query(sql,[name,description,imageUrl,isActive,isDeleted,createdBy,createdAt],function(err, result){
            if (err) throw err;
            getCon().query("SELECT * FROM category WHERE id=?",[result.insertId], function (err, result, fields) {
                if (err) throw err;
                return res.send(_.pick(result[0], ["id", "name", "description","imageUrl"]));
            });
        })
    })
})
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let categoryid=req.params.id;
    let name = req.body.name;
    let description = req.body.description;
    let imageUrl = req.body.imageUrl;
    let isActive=1;
    let isDeleted=0;
    let updatedBy=10;
    let updatedAt=new Date();
    let findSql='SELECT * FROM category WHERE id = ?';
    getCon().query(findSql,[categoryid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The category with the given ID was not found.');
        }
        let checkSql ='SELECT * FROM category WHERE name = ? && NOT id=?';
        getCon().query(checkSql,[name,categoryid],function (err, result){
            if (err) throw err;
            if(result.length > 0){
                return res.status(400).send("This category name already Exist.");
            }
            getCon().query("UPDATE category SET name = ?,description=?,imageUrl=?,isActive=?,isDeleted=?,updatedBy=?,updatedAt=? WHERE id = ?",[name,description,imageUrl,isActive,isDeleted,updatedBy,updatedAt,categoryid],function (err, result) {
                if (err) throw err;
                getCon().query("SELECT * FROM category WHERE id=?",[categoryid], function (err, result, fields) {
                    if (err) throw err;
                    return res.send(_.pick(result[0], ["id", "name", "description","imageUrl"]));
                });
            });
        })
    })
  });
  router.delete('/:id', async (req, res) => {
    let categoryid=req.params.id;
    let findSql='SELECT * FROM category WHERE id = ?';
    getCon().query(findSql,[categoryid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The category with the given ID was not found.');
        }
        getCon().query("DELETE FROM category WHERE id = ?",[categoryid],function(err, brandres) {
            if (err) throw err;
            res.send(_.pick(result[0], ["id", "name", "description","imageUrl"]));
        })
    })
  });
  router.get('/:id', async (req, res) => {
    let categoryid=req.params.id;
    let findSql='SELECT * FROM category WHERE id = ?';
    getCon().query(findSql,[categoryid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The category with the given ID was not found.');
        }
        res.send(_.pick(result[0], ["id", "name", "description","imageUrl"]));
    })
  });  
module.exports = router;