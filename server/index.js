const express= require('express');
const app= express();
const router=require("./routs/router");
const {initPool}=require("./dbService/request")

initPool();
app.use("/",router);
app.listen(5000,()=>{console.log("Server started on port 5000!")})