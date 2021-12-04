const express = require('express');
const router=express.Router();
const _ = require('lodash');
const path = require('path');
const {validate } = require("../models/brand");
const {getCon} = require("../dbCon");
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/brands')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage }).fields([
    { name: 'imageUrl' }
])
router.get('/',(req, res) => {
    let createdAt=new Date();
    console.log(createdAt);
    getCon().query("SELECT id,name,description,imageUrl,isActive FROM brands ORDER BY id DESC",(err, brands)=>{
        if (err) throw err;
        res.send(brands);
    });
});
router.post("/",upload, (req, res) => {
    const { error } = validate({name:req.body.name,description:req.body.description});
    if (error) return res.status(400).send(error.details[0].message);
    let name = req.body.name;
    let description = req.body.description;
    let imageUrl=Object.keys(req.files).length?req.files.imageUrl[0].filename:"";
    let isActive=1;
    let isDeleted=0;
    let createdBy=10;
    let createdAt=new Date();
    let findBrandSql='SELECT * FROM brands WHERE name = ?';
    getCon().query(findBrandSql,[name],async function (err, result) {
        if (err) throw err;
        if(result.length > 0){
            return res.status(400).send("This brand name already Exist.");
        }
        var sql = "INSERT INTO brands (name,description,imageUrl,isActive,isDeleted,createdBy,createdAt) VALUES (?,?,?,?,?,?,?)";
        getCon().query(sql,[name,description,imageUrl,isActive,isDeleted,createdBy,createdAt],function(err, result){
            if (err) throw err;
            getCon().query("SELECT * FROM brands WHERE id=?",[result.insertId], function (err, result, fields) {
                if (err) throw err;
                return res.send(_.pick(result[0], ["id", "name", "description","imageUrl","isActive"]));
            });
        })
    })
})
router.put('/:id',upload, (req, res) => {
    const { error } = validate({name: req.body.name,description:req.body.description}); 
    if (error) return res.status(400).send(error.details[0].message);
    let brandid=req.params.id;
    let name = req.body.name;
    let description = req.body.description;
    let imageUrl=Object.keys(req.files).length?req.files.imageUrl[0].filename:"";
    let isActive=1;
    let isDeleted=0;
    let updatedBy=10;
    let updatedAt=new Date();
    let findBrandSql='SELECT * FROM brands WHERE id = ?';
    getCon().query(findBrandSql,[brandid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The brand with the given ID was not found.');
        }
        let checkSql ='SELECT * FROM brands WHERE name = ? && NOT id=?';
        getCon().query(checkSql,[name,brandid],function (err, result){
            if (err) throw err;
            if(result.length > 0){
                return res.status(400).send("This brand name already Exist.");
            } 
            getCon().query("UPDATE brands SET name = ?,description=?,imageUrl=?,isActive=?,isDeleted=?,updatedBy=?,updatedAt=? WHERE id = ?",[name,description,imageUrl,isActive,isDeleted,updatedBy,updatedAt,brandid],function (err, result) {
                if (err) throw err;
                getCon().query("SELECT * FROM brands WHERE id=?",[brandid], function (err, upresult, fields) {
                    if (err) throw err;
                    return res.send(_.pick(upresult[0], ["id", "name", "description","imageUrl","isActive"]));
                });
            });
        });
       
    })
  });
  router.delete('/:id', async (req, res) => {
    let brandid=req.params.id;
    let findBrandSql='SELECT * FROM brands WHERE id = ?';
    getCon().query(findBrandSql,[brandid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The brand with the given ID was not found.');
        }
        getCon().query("DELETE FROM brands WHERE id = ?",[brandid],function(err, brandres) {
            if (err) throw err;
            console.log(result[0])
            res.send(_.pick(result[0], ["id", "name", "description","imageUrl","isActive"]));
        })
    })
  });
  router.get('/:id', async (req, res) => {
    let brandid=req.params.id;
    let findBrandSql='SELECT * FROM brands WHERE id = ?';
    getCon().query(findBrandSql,[brandid],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The brand with the given ID was not found.');
        }
        res.send(_.pick(result[0], ["id", "name", "description","imageUrl","isActive"]));
    })
  });  
module.exports = router;