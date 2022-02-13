const express= require('express');
const app= express();
const router=require("./routs/router");
const authRouter=require("./routs/auth");
const {initPool}=require("./dbService/request")

app.use(express.json());
initPool();
app.use("/",router);
app.use("/auth",authRouter);
app.listen(5000,()=>{console.log("Server started on port 5000!")})