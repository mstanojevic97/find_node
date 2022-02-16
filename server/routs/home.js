const express = require ('express');
const router = express.Router();
const {getCompany, getCompanyId,getFreightProducerTaken,getFreightProducerFree,getFreightSupplierFree,getFreightSupplierTaken, takeFreight,getAdminEmail,updateCompany, getLoad, sendFreight, finishFreight, getFreightId, updateFreight, cancelFreight} =require("../dbService/dbService");
//kad se uloguje proizvodjac
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
//kad se uloguje prevoznik
router.get("/supplier",async(req,res)=>{
    const id= req.body.id;
    const supplier=await getCompanyId(id);
    const freightTaken=await getFreightSupplierTaken(id);
    const freightFree=await getFreightSupplierFree();
    const supplierData={
        companyName:supplier[0].companyName,
        VAT:supplier[0].VAT,
        email:supplier[0].email
    }
    res.json({
        "supplier":supplierData,
        "freightFree":freightFree,
        "freightTaken":freightTaken
    });
});
//kad se uloguje admin
router.get("/admin",async(req,res)=>{
    const email = req.body.email;
    const admin=await getAdminEmail(email);
    const companies = await getCompany();
    res.json({
        "admin":admin,
        "companies":companies
    });
});
// promena podataka proizvodjaca
router.post("/producer/update",async(req,res)=>{
    const id = req.body.id; // iz jwt
    const updateData ={
        companyName:req.body.companyName,
        VAT:req.body.VAT,
        email:req.body.email
    }
    const report = await updateCompany (id,updateData.companyName,updateData.VAT,updateData.email);
    res.send("Uspesna izmena");
});
//dodavanje novog tereta
router.post('/producer/add',async(req,res)=>{
    const id = req.body.id; // jwt
    const load = req.body.load;
    const loadType = await getLoad(load);
    const data={
        weight:req.body.weight,
        length:req.body.length,
        warehouse:req.body.warehouse,
        destination:req.body.destination,
        note:req.body.note,
        price:req.body.price,
        idProducer:id,
        idLoad:loadType[0].idLoad
    }
    const report =await sendFreight (data.weight,data.length,data.warehouse,data.destination,data.note,data.price,data.idProducer,data.idLoad);
    res.send("Uspesan upis");
});
//ucitava teret za promenu
router.get ('/producer/edit',async(req,res)=>{
    const idFreight = req.body.idFreight; // vadimo onClick
    const freight= await getFreightId(idFreight);
    const data={
        weight:freight[0].weight,
        length:freight[0].length,
        warehouse:freight[0].warehouse,
        destination:freight[0].destination,
        note:freight[0].note,
        price:freight[0].price,
        loadType:freight[0].loadType
    }
    res.json({
        weight:data.weight,
        length:data.length,
        warehouse:data.warehouse,
        destination:data.destination,
        note:data.note,
        price:data.price,
        loadType:data.loadType
    });
});
//izmena tereta 
router.post ('/producer/edit',async(req,res)=>{
    const idFreight = req.body.idFreight;
    const load = req.body.load;
    const loadType = await getLoad(load);
    const data={
        weight:req.body.weight,
        length:req.body.length,
        warehouse:req.body.warehouse,
        destination:req.body.destination,
        note:req.body.note,
        price:req.body.price,
        idLoad:loadType[0].idLoad,
        idFreight:idFreight
    }
    await updateFreight(data.weight,data.length,data.warehouse,data.destination,data.note,data.price,data.idLoad,data.idFreight);
    res.send("Uspesna izmena");
});
// izmena podataka prevoznika
router.post("/supplier/update",async(req,res)=>{
    const id = req.body.id; // iz jwt
    const updateData ={
        companyName:req.body.companyName,
        VAT:req.body.VAT,
        email:req.body.email
    }
    const report = await updateCompany (id,updateData.companyName,updateData.VAT,updateData.email);
    res.send("Uspesna izmena");
});

router.post("/supplier/finish",async(req,res)=>{
    const id = req.body.idFreight;
    const report = await finishFreight(id);
    res.send("Zavrsena isporuka!");
});
router.post("/supplier/cancel", async(req,res)=>{
    const id = req.body.idFreight;
    const report = await cancelFreight(id);
    res.send("Uspesno ste otkazali!");
});
router.post("/supplier/confirm",async(req, res)=>{
    const idCompany = req.body.idCompany;
    const idFreight = req.body.idFreight;
    await takeFreight(idCompany,idFreight);
    res.send("Uspesna konfirmacija!");
});
module.exports=router;  