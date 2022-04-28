const express = require ('express');
const router = express.Router();
const {getLoads} = require('../dbService/dbService')
const {authMiddleware, authRole} = require('../middleware/auth')

router.get("/loads",
authMiddleware,
async(req,res)=>{
    const loads = await getLoads();
    return res.json(loads);
});

module.exports=router; 