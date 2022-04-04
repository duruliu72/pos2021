const express = require('express');
const router=express.Router();
const path = require('path');
const {getCon} = require("../dbCon");

router.post('/',(req, res) => {
    let sales_invoice = req.body.sales_invoice;
    let warehouse_id = req.body.warehouse_id;
    let customer_id = req.body.customer_id;
    let sales_point = req.body.sales_point;
    let sales_point_man = req.body.sales_point_man;
    let sales_man = req.body.sales_man;
    let flat_discount = req.body.flat_discount;
    let total_sale_price = req.body.total_sale_price;
    let cashAmount = req.body.cashAmount;
    let refundAmount=req.body.refundAmount;
    let sales_date=req.body.sales_date;
    // let isActive=1;
    // let isDeleted=0;
    // let createdBy=10;
    let article_ids=req.body.article_ids;
    let articleSizes=req.body.articleSizes;
    let articleColors=req.body.articleColors;
    let sale_qtys=req.body.sale_qtys;
    let sale_prices=req.body.sale_prices;
    let sale_discounts=req.body.sale_discounts;
    let saleMstSql=`INSERT INTO tbl_sales (sales_invoice,warehouse_id,customer_id,sales_point,sales_point_man,sales_man,flat_discount,total_sale_price,cashAmount,refundAmount,sales_date) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
    getCon().query(saleMstSql,[sales_invoice,warehouse_id,customer_id,sales_point,sales_point_man,sales_man,flat_discount,total_sale_price,cashAmount,refundAmount,sales_date],(err, salesMstRes)=>{
        if (err) throw err;
        let saleDetails=[];
        article_ids.forEach((id,i) => {
            saleDetails.push([salesMstRes.insertId,article_ids[i],articleSizes[i],articleColors[i],sale_qtys[i],sale_prices[i],sale_discounts[i]]);
        });
        var saleDetailsSql="INSERT INTO tbl_sales_details (sales_id,article_id,articleSize,articleColor,sale_qty,sale_price,sale_discount) VALUES ?";
        getCon().query(saleDetailsSql,[saleDetails],function (err, saleDetailsRes) {
            if (err) throw err;
            getCon().query(`SELECT * FROM tbl_sales WHERE id=?`,[salesMstRes.insertId],function (err, salesMstResult){
                if (err) throw err;
                getCon().query("SELECT * FROM tbl_sales_details WHERE sales_id=?",[salesMstRes.insertId],function (err,salesDetails){
                    if (err) throw err;
                    let salesMst=salesMstResult[0];
                    salesMst.details=salesDetails;
                    return res.send(salesMst);
                });
            })
        });
    });
});
module.exports = router;