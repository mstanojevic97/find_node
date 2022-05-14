const express = require ('express');
const router = express.Router();
const {authMiddleware, authRole} = require('../middleware/auth')
const {ROLE} = require('../roles')
const {deleteCompany, updateAdmin, getCompany, getCompanyId,getFreightProducerTaken,getFreightProducerFree,getFreightSupplierFree,getFreightSupplierTaken, takeFreight,getAdminEmail,updateCompany, getCompletedFreights, sendFreight, finishFreight, getFreightId, updateFreight, cancelFreight, deleteFreight, getFreightSupplierCompleted, getFreightProducerCompleted} =require("../dbService/dbService");
//kad se uloguje proizvodjac
router.get("/producer",
authMiddleware,
authRole([ROLE.PRODUCER]),
async(req,res)=>{
    const id = req.user.sub;
    const producer=await getCompanyId(id);
    const producerData={
        idCompany: producer[0].idCompany,
        companyName:producer[0].companyName,
        VAT:producer[0].VAT,
        email:producer[0].email
    }
    const freightTaken = await getFreightProducerTaken(id);
    const freightCompleted = await getFreightProducerCompleted(id);
    const freightFree = await getFreightProducerFree(id);
    res.json({
        producer: producerData,
        freightFree:freightFree,
        freightTaken:freightTaken,
        freightCompleted:freightCompleted
    });
});

//kad se uloguje prevoznik
router.get("/supplier",
authMiddleware,
authRole([ROLE.SUPPLIER]),
async(req,res)=>{
    const id = req.user.sub;
    const supplier=await getCompanyId(id);
    const freightCompleted = await getFreightSupplierCompleted(id);
    const freightTaken=await getFreightSupplierTaken(id);
    const freightFree=await getFreightSupplierFree();
    const supplierData={
        idCompany:supplier[0].idCompany,
        companyName:supplier[0].companyName,
        VAT:supplier[0].VAT,
        email:supplier[0].email
    }
    res.json({
        supplier:supplierData,
        freightFree:freightFree,
        freightTaken:freightTaken,
        freightCompleted:freightCompleted
    });
});
//kad se uloguje admin
router.get("/admin",
authMiddleware,
authRole([ROLE.ADMIN]),
async(req,res)=>{
    const dataa = req.user.email;
    const data = await getAdminEmail(dataa);
    const companies = await getCompany();
    const completed = await getCompletedFreights();
    const admin = data[0];
    res.json({
        admin:admin,
        companies:companies,
        completed:completed
    });
});
router.post("/admin/update", async(req,res) =>{
    const idAdmin = req.body.idAdmin;
    const data = {
        name:req.body.name,
        surname:req.body.surname,
        email:req.body.email
    }
    await updateAdmin(data.name, data.surname, data.email, idAdmin);
    res.json({});
})
// promena podataka kompanije
router.post("/company/update",async(req,res)=>{
    const idCompany = req.body.idCompany;
    const updateData ={
        companyName:req.body.companyName,
        VAT:req.body.VAT,
        email:req.body.email
    }
    const report = await updateCompany (idCompany,updateData.companyName,updateData.VAT,updateData.email);
    res.json({message:"Uspesna izmena"});
});
//dodavanje novog tereta
router.post('/producer/add',
authMiddleware,
authRole([ROLE.PRODUCER]),
async(req,res)=>{
    const id = req.user.sub;
    const data={
        weight:req.body.weight,
        length:req.body.length,
        warehouse:req.body.warehouse,
        destination:req.body.destination,
        note:req.body.note,
        price:req.body.price,
        idProducer:id,
        idLoad:req.body.load
    }
    const report =await sendFreight (data.weight,data.length,data.warehouse,data.destination,data.note,data.price,data.idProducer,data.idLoad);
    return res.json({});
});
router.post('/producer/delete',async(req,res)=>{
    const id = req.body.idFreight;
    await deleteFreight(id);
    return res.json({});
});
router.post('/admin/deleteCompany',
authMiddleware,
authRole([ROLE.ADMIN]),
async(req,res)=>{
    const id = req.body.id;
    await deleteCompany(id);
    res.json({
        message:"Company deleted successfully!"
    });
})
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
        idLoad:freight[0].idLoad,
        loadType:freight[0].loadType
    }
    res.json({
        weight:data.weight,
        length:data.length,
        warehouse:data.warehouse,
        destination:data.destination,
        note:data.note,
        price:data.price,
        idLoad:data.idLoad,
        loadType:data.loadType
    });
});
//izmena tereta 
router.post ('/producer/edit',async(req,res)=>{
    const data={
        weight:req.body.weight,
        length:req.body.length,
        warehouse:req.body.warehouse,
        destination:req.body.destination,
        note:req.body.note,
        price:req.body.price,
        idLoad:req.body.idLoad,
        idFreight:req.body.idFreight
    }
    await updateFreight(data.weight,data.length,data.warehouse,data.destination,data.note,data.price,data.idLoad,data.idFreight);
    return res.status(200).json({message: 'Ok'});
});

router.post("/supplier/finish",async(req,res)=>{
    const id = req.body.idFreight;
    const report = await finishFreight(id);
    res.json({});
});
router.post("/supplier/cancel", async(req,res)=>{
    const id = req.body.idFreight;
    const report = await cancelFreight(id);
    res.json({});
});
router.post("/supplier/confirm",async(req, res)=>{
    const idCompany = req.body.idCompany;
    const idFreight = req.body.idFreight;
    await takeFreight(idCompany,idFreight);
    res.json({});
});

module.exports=router;  