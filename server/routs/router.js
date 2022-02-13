const express = require ('express');
const {getRole,getCompany,getCompanyId,sendCompany,deleteCompany,updateCompany,getCompanyEmail,getAdminId,getAdminEmail,sendAdmin,updateAdmin,deleteAdmin,sendFreight,getFreight,getFreightProducerFree,getFreightProducerTaken,getFreightSupplierFree,getFreightSupplierTaken,takeFreight,getLoad, updateFreight}=require("../dbService/dbService");
const router = express.Router();

router.get("/producer/:id",async(req,res)=>{
    const id = req.params.id;
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
router.get("/producer/data/:id", async(req,res)=>{
    const id = req.params.id;
    const data=await getCompanyId(id);
    const producer = {
        companyName:data[0].companyName,
        VAT:data[0].VAT,
        email:data[0].email,
        pass:data[0].password
    }
    res.send(producer);
});
router.post("/producer/data", async(req,res)=>{
    const data={
        idCompany:req.body.id,
        companyName:req.body.companyName,
        VAT:req.body.VAT,
        email:req.body.email,
        password:req.body.pass
    }
    const report=await updateCompany(data.idCompany,data.companyName,data.VAT,data.email,data.password);
    res.send("Uspesna izmena!");
});
router.get("/producer/freight", async(req,res)=>{
    res.send("Da be da");
});
router.post("/producer/freight/:id", async (req,res)=>{
    const id = req.params.id;
    const data={
        weight:req.body.weight,
        length:req.body.length,
        warehouse:req.body.warehouse,
        destination:req.body.destination,
        note:req.body.note,
        price:req.body.price,
        idProducer:id,
        idLoad:req.body.idLoad
    }
    const report=await sendFreight(data.weight,data.length,data.warehouse,data.destination,data.note,data.price,data.idProducer,data.idLoad);
    res.send({insertId : report.insertId});
})

router.post("/producer/updateFreight", async (req,res)=>{
    const data={
        id: req.body.id,
        weight:req.body.weight,
        length:req.body.length,
        warehouse:req.body.warehouse,
        destination:req.body.destination,
        note:req.body.note,
        price:req.body.price,
        idLoad:req.body.idLoad
    }
    const report=await updateFreight(data.weight,data.length,data.warehouse,data.destination,data.note,data.price,data.idLoad,data.id);
    res.send("Uspesan promena");
});

module.exports=router; 