const express = require ('express');
const router = express.Router();
const { getCompanyId, getFreightProducerFree, getFreightProducerTaken, getFreightSupplierTaken, deleteFreight}=require("../dbService/dbService");

router.get("/admin/freights",async (req,res)=>{
    const id = 1;
    const company = await getCompanyId(id);
    let freightFree = [];
    let freightTaken = [];
    if(company[0].idRol==2)
    {
        freightFree = await getFreightProducerFree(id);
        freightTaken = await getFreightProducerTaken(id);
    }else{
        freightFree = null;
        freightTaken = await getFreightSupplierTaken(id);
    }
    res.json({
        data: company,
        freightTaken: freightTaken,
        freightFree: freightFree
    });
});
router.post("/admin/freights", async (req, res)=>{
    const id = req.body.id;
    await deleteFreight(id);
    res.send("Uspesno ste obrisali!");
})

module.exports=router; 