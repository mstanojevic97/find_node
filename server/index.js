const express= require('express');
const app= express();
const router=require("./routs/router");
const authRouter=require("./routs/auth");
const homeRouter=require("./routs/home");
const commonRouter=require("./routs/commonRequests");
const {initPool}=require("./dbService/request")

app.use(express.json());
initPool();
app.use("/test", (req, res)=>{
    res.send({
        Language:"NODE + REACT"
    });
});
app.use("/",router);
app.use("/auth",authRouter);
app.use("/home",homeRouter);
app.use("/common",commonRouter);
app.listen(5000,()=>{console.log("Server started on port 5000!")});