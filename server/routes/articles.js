const express = require('express');
const router=express.Router();
const _ = require('lodash');
const {validate,validateArticleForUpdate } = require("../models/article");
const {getCon} = require("../dbCon");
router.get('/',(req, res) => {
    getCon().query("SELECT id,articleCode,articleName,isActive FROM article_msts",(err, articles)=>{
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
router.post("/", (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let company_id = req.body.company_id;
    let articleCode = req.body.articleCode;
    let articleName = req.body.articleName;
    let brand_id = req.body.brand_id;
    let category_id = req.body.category_id;
    let gender_id = req.body.gender_id;
    let articleType_id = req.body.articleType_id;
    let isActive=1;
    let isDeleted=0;
    let createdBy=10;
    let createdAt=new Date();
    // for article Child
    let sizes=req.body.sizes;
    let colors=req.body.colors; 
    let mrps=req.body.mrps; 
    let prices=req.body.prices;
    let imageUrls= req.body.imageUrls; 
    let stockKeepingUnits=req.body.stockKeepingUnits; 
    let barcodes=req.body.barcodes; 
    let barcodeViews=req.body.barcodeViews;
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
            // var articleChildSql="INSERT INTO article_child (article_id,size,color,mrp,price,stockKeepingUnit,barcode,barcodeView) VALUES (?,?,?,?,?,?,?,?)";
            let articlechilds=[];
            sizes.forEach((size,i) => {
                articlechilds.push([articleres.insertId,size,colors[i],mrps[i],prices[i],imageUrls[i],stockKeepingUnits[i],barcodes[i],barcodeViews[i]]);
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
router.put('/:id', async (req, res) => {
    const { error } = validateArticleForUpdate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let article_id=req.params.id;
    let company_id = req.body.company_id;
    let articleCode = req.body.articleCode;
    let articleName = req.body.articleName;
    let brand_id = req.body.brand_id;
    let category_id = req.body.category_id;
    let gender_id = req.body.gender_id;
    let articleType_id = req.body.articleType_id;
    let isActive=1;
    let isDeleted=0;
    let updatedBy=10;
    let updatedAt=new Date();
    // for article Child
    let childids=req.body.childids;
    let sizes=req.body.sizes;
    let colors=req.body.colors; 
    let mrps=req.body.mrps; 
    let prices=req.body.prices;
    let imageUrls= req.body.imageUrls; 
    let stockKeepingUnits=req.body.stockKeepingUnits; 
    let barcodes=req.body.barcodes; 
    let barcodeViews=req.body.barcodeViews;
    let findSql='SELECT * FROM article_msts WHERE id = ?';
    getCon().query(findSql,[article_id],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The article with the given ID was not found.');
        }
        let checkSql ='SELECT * FROM article_msts WHERE articleCode = ? && articleName = ? && NOT id=?';
        getCon().query(checkSql,[articleCode,articleName,article_id],function (err, result){
            if (err) throw err;
            if(result.length > 0){
                return res.status(400).send("This article already Exist.");
            } 
            getCon().query("UPDATE article_msts SET company_id=?, articleCode =?,articleName =?,brand_id=?,category_id=?,gender_id=?,articleType_id=?,isActive=?,isDeleted=?,updatedBy=?,updatedAt=? WHERE id =?",[company_id,articleCode,articleName,brand_id,category_id,gender_id,articleType_id,isActive,isDeleted,updatedBy,updatedAt,article_id],function (err, result) {
                if (err) throw err;
                // update articleChilds
                childids.forEach((childid,i) => {
                    getCon().query("UPDATE article_child SET size=?,color=?,mrp=?,price=?,imageUrl=?,stockKeepingUnit=?,barcode=?,barcodeView=? WHERE id=?",[sizes[i],colors[i],mrps[i],prices[i],imageUrls[i],stockKeepingUnits[i],barcodes[i],barcodeViews[i],parseInt(childid)],function (err,updateres){
                        if (err) throw err;
                        if((childids.length-1)===i){
                            getCon().query("SELECT id,articleCode,articleName,isActive FROM article_msts WHERE id = ?",[article_id], function (err, result, fields) {
                                if (err) throw err;
                                getCon().query("SELECT * FROM article_child WHERE article_id=?",[article_id],function (err, cresult){
                                    if (err) throw err;
                                    let article=result[0];
                                    let articleChildResult=cresult;
                                    article.childs=articleChildResult;
                                    return res.send(article);
                                })
                            });
                        }
                    });
                });
            });
        });
       
    })
  });
  router.delete('/:id', async (req, res) => {
    let article_id =req.params.id;
    let findSql='SELECT id,articleCode,articleName,isActive FROM article_msts WHERE id = ?';
    getCon().query(findSql,[article_id],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The article with the given ID was not found.');
        }
        getCon().query("SELECT * FROM article_child WHERE article_id=?",[article_id],function (err,articleChilds){
            if (err) throw err;
            getCon().query("DELETE FROM article_msts WHERE id = ?",[article_id],function(err, delarticles) {
                if (err) throw err;
                getCon().query("DELETE FROM article_child WHERE article_id = ?",[article_id],function(err, delres) {
                    if (err) throw err;
                    let article=result[0];
                    article.childs=articleChilds;
                    res.send(article);
                })
            })
        })
    })
  });
  router.get('/:id', async (req, res) => {
    let article_id =req.params.id;
    let findSql='SELECT id,articleCode,articleName,isActive FROM article_msts WHERE id = ?';
    getCon().query(findSql,[article_id],function (err, articles) {
        if (err) throw err;
        if(articles.length == 0){
            return res.status(404).send('The article with the given ID was not found.');
        }
        getCon().query("SELECT * FROM article_child WHERE article_id=?",[article_id],function (err,articleChilds){
            if (err) throw err;
            let article=articles[0];
            article.childs=articleChilds;
            res.send(article);
        })
    })
  });  
module.exports = router;