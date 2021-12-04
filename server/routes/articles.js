const express = require('express');
const router=express.Router();
const path = require('path');
const {validate,validateArticleForUpdate } = require("../models/article");
const {getCon} = require("../dbCon");
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage }).fields([
    { name: 'imageUrls' }
])
router.get('/',(req, res) => {
    getCon().query("SELECT id,articleCode,articleName,brand_id,category_id,gender_id,articleType_id,isActive FROM article_msts",(err, articles)=>{
        if (err) throw err;
        articles.forEach((article,i)=>{ 
            getCon().query("SELECT * FROM article_child WHERE article_id=?",[article.id],function (err,cresult){
                if (err) throw err;
                articles[i].childs=cresult;
                if((articles.length-1)===i){
                    res.send(articles);
                }
            })
        });
    });
});
router.post('/',upload, function (req, res) {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    let company_id = parseInt(req.body.company_id);
    let articleCode = req.body.articleCode;
    let articleName = req.body.articleName;
    let brand_id = parseInt(req.body.brand_id);
    let category_id = parseInt(req.body.category_id);
    let gender_id = parseInt(req.body.gender_id);
    let articleType_id = parseInt(req.body.articleType_id);
    let isActive=1;
    let isDeleted=0;
    let createdBy=10;
    let createdAt=new Date();
    // for article Child 
    let sizes=req.body.sizes.split(',');
    let colors=req.body.colors.split(','); 
    let mrpsinputs=req.body.mrps.split(',');
    let mrps=[];
    mrpsinputs.forEach(item => {
        mrps.push(parseFloat(item));
    });
    let pricesinputs=req.body.prices.split(',');
    let prices=[];
    pricesinputs.forEach(item => {
        prices.push(parseFloat(item));
    });
    let imageUrls=[];
    req.files.imageUrls.forEach((item, index)=>{
        imageUrls.push(item.filename);
    })
    let stockKeepingUnits=req.body.stockKeepingUnits.split(','); 
    let barcodesinputs=req.body.barcodes.split(',');
    let barcodes=[];
    barcodesinputs.forEach(item => {
        barcodes.push(BigInt(item));
    });
    let barcodeViews=req.body.barcodeViews.split(',');
    let findSql='SELECT * FROM article_msts WHERE articleCode = ? && articleName = ?';
    getCon().query(findSql,[articleCode,articleName],async function (err, findRes) {
        if (err) throw err;
        if(findRes.length > 0){
            return res.status(400).send("This article already Exist.");
        }
        var sql = "INSERT INTO article_msts (company_id,articleCode,articleName,brand_id,category_id,gender_id,articleType_id,isActive,isDeleted,createdBy,createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        getCon().query(sql,[company_id,articleCode,articleName,brand_id,category_id,gender_id,articleType_id,isActive,isDeleted,createdBy,createdAt],function(err, articleres){
            if (err) throw err;
            // article child insert here 
            var articleChildSql="INSERT INTO article_child (article_id,size,color,mrp,price,imageUrl,stockKeepingUnit,barcode,barcodeView) VALUES ?";
            let articlechilds=[];
            sizes.forEach((size,i) => {
                articlechilds.push([articleres.insertId,sizes[i],colors[i],mrps[i],prices[i],imageUrls[i],stockKeepingUnits[i],barcodes[i],barcodeViews[i]]);
            });
            getCon().query(articleChildSql,[articlechilds],function (err, articlechildres){
                if (err) throw err;
                getCon().query("SELECT * FROM article_msts WHERE id=?",[articleres.insertId], function (err, result, fields) {
                    if (err) throw err;
                    getCon().query("SELECT * FROM article_child WHERE article_id=?",[articleres.insertId],function (err,cresult){
                        if (err) throw err;
                        let article=result[0];
                        let articleChildResult=cresult;
                        article.childs=articleChildResult;
                        return res.send(article);
                    });
                });
            });
        })
    })
})
module.exports = router;