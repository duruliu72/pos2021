require("express-async-errors");
const express=require('express');
const app = express();
const {setCon} = require("./dbCon");
const port=8080;

process.on("uncaughtException",(ex) =>{
    console.log("asdfasdfduncaughtException",ex);
});
process.on("unhandledRejection",(ex) =>{
    console.log("1222222");
    throw ex;
});
require("./startup/routes")(app);
app.listen(port,()=>{
    setCon();
    console.log('listening on port',port);
});