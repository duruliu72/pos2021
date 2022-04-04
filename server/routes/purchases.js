const express = require('express');
const router=express.Router();
const _ = require('lodash');
const {validate } = require("../models/purchase");
const {getCon} = require("../dbCon");
router.get('/',(req, res) => {
    getCon().query(`SELECT tbl_purchase.id,
	tbl_purchase.purchase_invoice,
    tbl_purchase.isActive,
    tbl_purchase.purchase_date,
    company.companyName,
    warehouses.warehouseName,
    warehouses.warehouseCode,
    suppliers.supplierName,
    suppliers.email
    FROM tbl_purchase
    INNER JOIN company ON company.id=tbl_purchase.company_id
    INNER JOIN warehouses ON warehouses.id=tbl_purchase.warehouse_id
    INNER JOIN suppliers ON suppliers.id=tbl_purchase.supplier_id 
    ORDER BY tbl_purchase.id DESC`,(err, purchases)=>{
        if (err) throw err;
        purchases.forEach((item,i)=>{ 
            getCon().query(`SELECT tbl_purchase_details.*,article_msts.articleCode,article_msts.articleName FROM tbl_purchase_details 
            INNER JOIN article_msts ON article_msts.id=tbl_purchase_details.article_id
            WHERE purchase_id=?`,[item.id],function (err,cresult){
                if (err) throw err;
                purchases[i].details=cresult;
                if((purchases.length-1)===i){
                    res.send(purchases);
                }
            })
        });
    });
});
router.post("/", (req, res) => {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    let purchase_invoice = req.body.purchase_invoice;
    let company_id = req.body.company_id;
    let warehouse_id = req.body.warehouse_id;
    let supplier_id = req.body.supplier_id;
    let description = req.body.description;
    let purchase_date=req.body.purchase_date;
    let isActive=1;
    let isDeleted=0;
    let createdBy=10;
    let article_ids=req.body.article_ids;
    let articleSizes=req.body.articleSizes;
    let articleColors=req.body.articleColors;
    let purchase_qtys=req.body.purchase_qtys;
    let purchase_rates=req.body.purchase_rates;
    let findSql='SELECT * FROM tbl_purchase WHERE purchase_invoice = ?';
    getCon().query(findSql,[purchase_invoice],async function (err, result) {
        if (err) throw err;
        if(result.length > 0){
            return res.status(400).send("This purchase Invoice already Created.");
        }
        var sql = "INSERT INTO tbl_purchase (purchase_invoice,company_id,warehouse_id,supplier_id,description,purchase_date,isActive,isDeleted,createdBy) VALUES (?,?,?,?,?,?,?,?,?)";
        getCon().query(sql,[purchase_invoice,company_id,warehouse_id,supplier_id,description,purchase_date,isActive,isDeleted,createdBy],function(err, presult){
            if (err) throw err;
            let purchaseDetails=[];
            article_ids.forEach((id,i) => {
                purchaseDetails.push([presult.insertId,article_ids[i],articleSizes[i],articleColors[i],purchase_qtys[i],purchase_rates[i]]);
            });
            var purchaseDetailsSql="INSERT INTO tbl_purchase_details (purchase_id,article_id,articleSize,articleColor,purchase_qty,purchase_rate) VALUES ?";
            getCon().query(purchaseDetailsSql,[purchaseDetails],function (err, detailsres){
                if (err) throw err;
                getCon().query(`SELECT tbl_purchase.id,
                tbl_purchase.purchase_invoice,
                tbl_purchase.isActive,
                company.companyName,
                warehouses.warehouseName,
                warehouses.warehouseCode,
                suppliers.supplierName,
                suppliers.email
                FROM tbl_purchase
                INNER JOIN company ON company.id=tbl_purchase.company_id
                INNER JOIN warehouses ON warehouses.id=tbl_purchase.warehouse_id
                INNER JOIN suppliers ON suppliers.id=tbl_purchase.supplier_id 
                  WHERE tbl_purchase.id=?`,[result.insertId], function (err, result, fields) {
                    if (err) throw err;
                    return res.send(result[0]);
                });
            })
        })
    })
})
// router.put('/:id', async (req, res) => {
//     const { error } = validate(req.body); 
//     if (error) return res.status(400).send(error.details[0].message);
//     let supplierid=req.params.id;
//     let supplierName = req.body.supplierName;
//     let email = req.body.email;
//     let phone = req.body.phone;
//     let country_id = req.body.country_id;
//     let city_id = req.body.city_id;
//     let supplierAddress = req.body.supplierAddress;
//     let isActive=1;
//     let isDeleted=0;
//     let updatedBy=10;
//     let updatedAt=new Date();
//     let findSql='SELECT * FROM suppliers WHERE id = ?';
//     getCon().query(findSql,[supplierid],function (err, result) {
//         if (err) throw err;
//         if(result.length == 0){
//             return res.status(404).send('The supplier with the given ID was not found.');
//         }
//         let checkSql ='SELECT * FROM suppliers WHERE email = ? && NOT id=?';
//         getCon().query(checkSql,[email,supplierid],function (err, result){
//             if (err) throw err;
//             if(result.length > 0){
//                 return res.status(400).send("This supplier already Exist.");
//             } 
//             getCon().query("UPDATE suppliers SET supplierName = ?,email=?,phone = ?,country_id=?,city_id=?,supplierAddress=?,isActive=?,isDeleted=?,updatedBy=?,updatedAt=? WHERE id = ?",[supplierName,email,phone,country_id,city_id,supplierAddress,isActive,isDeleted,updatedBy,updatedAt,supplierid],function (err, result) {
//                 if (err) throw err;
//                 getCon().query(`SELECT suppliers.id,supplierName,email,phone,countries.countryName,cities.cityName,country_id,city_id,supplierAddress,suppliers.isActive 
//                 FROM suppliers
//                 INNER JOIN countries ON countries.id=suppliers.country_id
//                 INNER JOIN cities ON cities.id=suppliers.city_id WHERE suppliers.id=?`,[supplierid], function (err, result, fields) {
//                     if (err) throw err;
//                     return res.send(_.pick(result[0], ["id", "supplierName", "email","phone","countryName","cityName","country_id","city_id","supplierAddress","isActive"]));
//                 });
//             });
//         });
       
//     })
//   });
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
  router.post('/filterbyarticle',(req, res) => {
    let article = req.body.article;
    let searchSql=`SELECT tbl_purchase_details.article_id,article_msts.articleName,article_msts.articleCode FROM tbl_purchase_details
    INNER JOIN article_msts ON article_msts.id=tbl_purchase_details.article_id
    WHERE article_msts.articleName LIKE '%${article}%'
    GROUP BY article_id ORDER BY article_id DESC`;
    getCon().query(searchSql,(err, articles)=>{
        if (err) throw err;
        if(articles.length == 0){
            return res.status(404).send(`The article with the search key ${article} is not found.`);
        }
        return res.send(articles);
    });
}); 
  router.post('/filterbysize',(req, res) => {
    let article_id = req.body.article_id;
    let articleSize = req.body.articleSize;
    let searchSql=`SELECT tbl_purchase_details.article_id,tbl_purchase_details.articleSize FROM tbl_purchase_details WHERE article_id=? GROUP BY articleSize`;
    if(req.body.articleSize){
        searchSql=`SELECT tbl_purchase_details.article_id,tbl_purchase_details.articleSize FROM tbl_purchase_details WHERE article_id=? && articleSize LIKE '%${articleSize}%'  GROUP BY articleSize`;
    }
    getCon().query(searchSql,[article_id],(err, sizes)=>{
        if (err) throw err;
        if(sizes.length == 0){
            return res.status(404).send(`This article ${articleSize} size is not found.`);
        }
        return res.send(sizes);
    });
});
router.post('/filterbycolor',(req, res) => {
    let article_id = req.body.article_id;
    let articleSize = req.body.articleSize;
    let articleColor = req.body.articleColor;
    let searchSql=`SELECT articleCode,articleName,t1.*,article_child.mrp,article_child.price,article_child.imageUrl FROM(SELECT tbl_purchase_details.article_id,
        tbl_purchase_details.articleSize,
        tbl_purchase_details.articleColor,
        SUM(tbl_purchase_details.purchase_qty) AS qty
        FROM tbl_purchase_details WHERE article_id=? && articleSize=? GROUP BY articleColor) AS t1
        INNER JOIN article_child ON article_child.article_id=t1.article_id && article_child.size=t1.articleSize && article_child.color=t1.articleColor
        INNER JOIN article_msts ON article_msts.id=t1.article_id`;
    if(req.body.articleColor){
            searchSql=`SELECT articleCode,articleName,t1.*,article_child.mrp,article_child.price,article_child.imageUrl FROM(SELECT tbl_purchase_details.article_id,
                tbl_purchase_details.articleSize,
                tbl_purchase_details.articleColor,
                SUM(tbl_purchase_details.purchase_qty) AS qty
                FROM tbl_purchase_details WHERE article_id=? && articleSize=? && articleColor LIKE '%${articleColor}%' GROUP BY articleColor) AS t1
                INNER JOIN article_child ON article_child.article_id=t1.article_id && article_child.size=t1.articleSize && article_child.color=t1.articleColor
                INNER JOIN article_msts ON article_msts.id=t1.article_id`;
    }
    getCon().query(searchSql,[article_id,articleSize],(err, sizes)=>{
        if (err) throw err;
        if(sizes.length == 0){
            return res.status(404).send(`This article color ${articleColor} of ${articleSize} size is not found.`);
        }
        return res.send(sizes);
    });
});
module.exports = router;