const express = require ('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config');
const {sendCompany, getRole, getCompanyEmail, getAdminEmail, getRoleName}=require("../dbService/dbService");

router.get("/role", async(req,res)=>{
    const role = await getRole();
    res.json(role);
});
router.post("/register", async(req,res)=>{
    const name = req.body.name
    const vat = req.body.vat
    const email = req.body.email
    const password = req.body.password
    const roleName = req.body.roleName
    const role = await getRoleName(roleName);
    const roleId = role[0].idRole;
    const company=await getCompanyEmail(email);
    if(company.length != 0){
        res.status(409)
        res.send("Email vec postoji!")
    }
    else{
        const passwordHash = bcrypt.hashSync(password, 10)
        await sendCompany(name,vat,email,passwordHash,roleId);
        res.status(200);
        res.send();
    }
});
router.post("/login", async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const company = await getCompanyEmail(email);
    if(company.length > 0) {
        if(company && company.length > 0 && bcrypt.compareSync(password, company[0].password)){
            const token = jwt.sign({
                                        sub: company[0].idCompany, 
                                        name: company[0].comapanyName, 
                                        email: company[0].email, 
                                        idRole : company[0].idRol,
                                        isAdmin : false
                                    },
                                    config.jwtSecretToken)

            return res.send(JSON.stringify({
                data:'Bearer '+token,
                role:company[0].idRol,
                idCompany:company[0].idCompany

        }))
        }
        else{
            res.status(401)
            return res.send(JSON.stringify("Pogresna lozinka!"))
        }
    }
    const admin = await getAdminEmail(email)
    if(!admin || admin.length === 0){
        res.status(401)
        return res.send(JSON.stringify("Pogresan email!"))
    }
    else {
        if(admin && admin.length > 0 && bcrypt.compareSync(password, admin[0].password)){
            const token = jwt.sign({
                sub: admin[0].idAdmin, 
                name: admin[0].name + ' ' + admin.surname, 
                email: admin[0].email, 
                idRole : admin[0].idRol,
                isAdmin : true
            },
            config.jwtSecretToken)

            return res.send(JSON.stringify({
                data:'Bearer '+token,
                role:admin[0].idRol
            })
            )
        }
        else{
            res.status(401)
            return res.send(JSON.stringify("Pogresna lozinka!"))
        }
    }
});

module.exports=router; 