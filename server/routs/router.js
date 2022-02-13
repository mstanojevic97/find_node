const express = require ('express');
const {getRole,getCompany,getCompanyId,sendCompany,deleteCompany,updateCompany,getCompanyEmail,getAdminId,getAdminEmail,sendAdmin,updateAdmin,deleteAdmin,sendFreight,getFreight,getFreightProducerFree,getFreightProducerTaken,getFreightSupplierFree,getFreightSupplierTaken,takeFreight,getLoad, updateFreight}=require("../dbService/dbService");
const router = express.Router();

router.get("/register", async(req,res)=>{
    const role= await getRole();
    res.send(role);
});
router.post("/register",async(req,res)=>{
    const data={
        companyName:req.body.companyName,
        VAT:req.body.VAT,
        email:req.body.email,
        pass:req.body.pass,
        idRole:req.body.idRole
    }
    const company=await getCompanyEmail(data.email);
    if(company.length!=0){
        res.send("Email vec postoji!")
    }else{
        await sendCompany(data.companyName,data.VAT,data.email,data.pass,data.idRole);
        res.send("Upisano");
    }
});
router.post("/login",async(req,res)=>{
    const data={
        email:req.body.email,
        pass:req.body.pass
    }
    const company=await getCompanyEmail(data.email);
    if(company==0){
        res.send("Pogresan email!");
    }else{
        if(company[0].password!=data.pass){
            res.send("Pogresna sifra!");
        }else{
            res.send(company[0]);
        }
    }
});
router.post("/login/admin",async(req,res)=>{
    const data={
        email:req.body.email,
        pass:req.body.pass
    }
    const admin= await getAdminEmail(data.email);
    if(admin.length==0){
        res.send("Pogresan email!");
    }else{
        if(admin[0].password!=data.pass){
            res.send("Pogresna sifra!");
        }else{
            res.send(admin[0]);
        }
    }
});
router.post("/admin/register", async(req,res)=>{
    const data={
        name:req.body.name,
        surname:req.body.surname,
        email:req.body.email,
        pass:req.body.pass
    }
    const admins=await getAdminEmail(data.email);
    if(admins.length>0){
        res.send("Postojeci email!");
    }else{
        const admin= await sendAdmin(data.name,data.surname,data.email,data.pass);
        res.send(admin);
    }
});
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
router.post("/producer/data/:id", async(req,res)=>{
    const id=req.params.id;
    const data={
        idCompany:id,
        companyName:req.body.companyName,
        VAT:req.body.VAT,
        email:req.body.email,
        password:req.body.pass
    }
    const report=await updateCompany(data.idCompany,data.companyName,data.VAT,data.email,data.password);
    res.send("Uspesna izmena!");
});
router.post("/producer/freight/:id", async (req,res)=>{
    const id=req.params.id;
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
    res.send("Uspesan unos!");
});
router.post("/producer/freight/update/:id", async (req,res)=>{
    const id=req.params.id;
    const data={
        weight:req.body.weight,
        length:req.body.length,
        warehouse:req.body.warehouse,
        destination:req.body.destination,
        note:req.body.note,
        price:req.body.price,
        idLoad:req.body.idLoad
    }
    const report=await updateFreight(data.weight,data.length,data.warehouse,data.destination,data.note,data.price,data.idLoad,id);
    res.send("Uspesan promena");
});



module.exports=router; 