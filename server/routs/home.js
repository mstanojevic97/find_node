const express = require ('express');
const router = express.Router();
const {getCompanyId,getFreightProducerTaken,getFreightProducerFree} =require("../dbService/dbService");

router.get("/producer",async(req,res)=>{
    const id = req.body.id;// id se vadi iz jwt tokena :D
    const producer=await getCompanyId(id);
    const producerData={
        companyName:producer[0].companyName,
        VAT:producer[0].VAT,
        email:producer[0].email
    }
    const freightTaken = await getFreightProducerTaken(id);
    const freightFree = await getFreightProducerFree(id);
    res.json({
        "producer": producerData,
        "freightFree":freightFree,
        "freightTaken":freightTaken
    });
});


module.exports=router;