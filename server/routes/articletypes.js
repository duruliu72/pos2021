const express = require('express');
const router=express.Router();
const _ = require('lodash');
const {validate } = require("../models/articletype");
const {getCon} = require("../dbCon");
router.get('/',(req, res) => {
    getCon().query("SELECT id,name,isActive FROM articletypes ORDER BY id DESC",(err, genders)=>{
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
    let findSql='SELECT * FROM articletypes WHERE name = ?';
    getCon().query(findSql,[name],async function (err, result) {
        if (err) throw err;
        if(result.length > 0){
            return res.status(400).send("This article type name already Exist.");
        }
        var sql = "INSERT INTO articletypes (name,isActive,isDeleted,createdBy,createdAt) VALUES (?,?,?,?,?)";
        getCon().query(sql,[name,isActive,isDeleted,createdBy,createdAt],function(err, result){
            if (err) throw err;
            getCon().query("SELECT * FROM articletypes WHERE id=?",[result.insertId], function (err, result, fields) {
                if (err) throw err;
                return res.send(_.pick(result[0], ["id", "name","isActive"]));
            });
        })
    })
})
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let articletypeid=req.params.id;
    let name = req.body.name;
    let isActive=1;
    let isDeleted=0;
    let updatedBy=10;
    let updatedAt=new Date();
    let findSql='SELECT * FROM articletypes WHERE id = ?';
    getCon().query(findSql,[articletypeid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The article type with the given ID was not found.');
        }
        let checkSql ='SELECT * FROM articletypes WHERE name = ? && NOT id=?';
        getCon().query(checkSql,[name,articletypeid],function (err, result){
            if (err) throw err;
            if(result.length > 0){
                return res.status(400).send("This article type name already Exist.");
            } 
            getCon().query("UPDATE articletypes SET name = ?,isActive=?,isDeleted=?,updatedBy=?,updatedAt=? WHERE id = ?",[name,isActive,isDeleted,updatedBy,updatedAt,articletypeid],function (err, result) {
                if (err) throw err;
                getCon().query("SELECT * FROM articletypes WHERE id=?",[articletypeid], function (err, result, fields) {
                    if (err) throw err;
                    return res.send(_.pick(result[0], ["id", "name", "isActive"]));
                });
            });
        });
       
    })
  });
  router.delete('/:id', async (req, res) => {
    let articletypeid=req.params.id;
    let findSql='SELECT * FROM articletypes WHERE id = ?';
    getCon().query(findSql,[articletypeid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The article type with the given ID was not found.');
        }
        getCon().query("DELETE FROM articletypes WHERE id = ?",[articletypeid],function(err, brandres) {
            if (err) throw err;
            res.send(_.pick(result[0], ["id", "name", "isActive"]));
        })
    })
  });
  router.get('/:id', async (req, res) => {
    let articletypeid=req.params.id;
    let findSql='SELECT * FROM articletypes WHERE id = ?';
    getCon().query(findSql,[articletypeid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The article type with the given ID was not found.');
        }
        res.send(_.pick(result[0], ["id", "name", "isActive"]));
    })
  });  
module.exports = router;