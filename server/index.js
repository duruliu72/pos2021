require("express-async-errors");
const express=require('express');
const app = express();
const {setCon} = require("./dbCon");
const port=8080;
process.on("uncaughtException",(ex) =>{
    console.log("uncaughtException",ex);
});
process.on("unhandledRejection",(ex) =>{
    console.log("unhandledRejection",ex);
    throw ex;
});
app.use(express.static('public'));
require("./startup/routes")(app);
app.listen(port,()=>{
    setCon();
    console.log('listening on port',port);
});