const express = require('express');
const router=express.Router();
const _ = require('lodash');
const path = require('path');
const {validate } = require("../models/category");
const {getCon} = require("../dbCon");
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/categories')
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
    getCon().query("SELECT id,name,description,imageUrl,isActive FROM category ORDER BY id DESC",(err, categories)=>{
        if (err) throw err;
        res.send(categories);
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
                return res.send(_.pick(result[0], ["id", "name", "description","imageUrl","isActive"]));
            });
        })
    })
})
router.put('/:id', upload, (req, res) => {
    const { error } = validate({name:req.body.name,description:req.body.description}); 
    if (error) return res.status(400).send(error.details[0].message);
    let categoryid=req.params.id;
    let name = req.body.name;
    let description = req.body.description;
    let imageUrl=Object.keys(req.files).length?req.files.imageUrl[0].filename:"";
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
                    return res.send(_.pick(result[0], ["id", "name", "description","imageUrl","isActive"]));
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
            res.send(_.pick(result[0], ["id", "name", "description","imageUrl","isActive"]));
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
        res.send(_.pick(result[0], ["id", "name", "description","imageUrl","isActive"]));
    })
  });  
module.exports = router;