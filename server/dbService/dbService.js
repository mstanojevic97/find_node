const request=require("./request");

async function getLoad(load)
{
    let sql="SELECT * FROM find.load WHERE loadType=?"
    return request.query(sql,[load]);
}
async function getRoleName(name)
{
    let sql="SELECT * FROM role WHERE roleName=?"
    return request.query(sql,[name]);
}
async function getRole()
{
    let sql="SELECT * FROM role WHERE idRole>1"
    return request.query(sql,[]);
}
async function getCompany()
{
    let sql="SELECT company.idCompany, company.companyName, company.VAT, company.email, role.roleName FROM company INNER JOIN role ON company.idRol=role.idRole WHERE company.idCompany>0"
    return request.query(sql,[]);
}
async function getCompanyId(id)
{
    let sql="SELECT * FROM company WHERE idCompany=?"
    return request.query(sql,[id]);
}
async function getCompanyEmail(email)
{
    let sql="SELECT * FROM company WHERE email=?"
    return request.query(sql,[email]);
}
async function sendCompany(companyName,VAT,email,password,idRole)
{
    let sql="INSERT INTO company (companyName,VAT,email,password,idRol) VALUES(?,?,?,?,?)"
    return request.query(sql,[companyName,VAT,email,password,idRole]);
}
async function deleteCompany(id)
{
    let sql="DELETE FROM company WHERE idCompany=?"
    return request.query(sql,[id]);
}
async function updateCompany(idCompany,companyName,VAT,email)
{
    let sql="UPDATE company SET companyName=?,VAT=?,email=? WHERE idCompany=?"
    return request.query(sql,[companyName,VAT,email,idCompany]);
}
async function getAdminId(id)
{
    let sql="SELECT * FROM admin WHERE idAdmin=?"
    return request.query(sql,[id]);
}
async function getAdminEmail(email)
{
    let sql="SELECT * FROM admin WHERE email=?"
    return request.query(sql,[email]);
}
async function sendAdmin(adminName,surname,email,password)
{
    let sql="INSERT INTO admin (name,surname,email,password,idRol) VALUES(?,?,?,?,1)"
    return request.query(sql,[adminName,surname,email,password])
}
async function updateAdmin(adminName,surname,email, idAdmin)
{
    let sql="UPDATE admin SET name=?,surname=?,email=? WHERE idAdmin=?"
    return request.query(sql,[adminName,surname,email,idAdmin]);
}
async function deleteAdmin(id)
{
    let sql="DELETE FROM admin WHERE idAdmin=?"
    return request.query(sql,[id]);
}
async function sendFreight(weight,length,warehouse,destination,note,price,idProducer,idLoad)
{
    let sql="INSERT INTO freight (weight,length,warehouse,destination,note,price,idProducer,idSupplier,idStatus,idLoad) VALUES(?,?,?,?,?,?,?,NULL,1,?)"
    return request.query(sql,[weight,length,warehouse,destination,note,price,idProducer,idLoad]);
}
async function getFreightTaken()
{
    let sql="SELECT freight.idFreight,freight.weight,freight.length,freight.warehouse,freight.destination,freight.note,freight.price,find.company.companyName,find.company.VAT,find.company.email,find.company.companyName,find.company.VAT,find.company.email,status.statusName,load.loadType FROM((((freight INNER JOIN status ON freight.idStatus=status.idStatus) INNER JOIN find.load ON freight.idLoad=find.load.idLoad) INNER JOIN find.company ON freight.idSupplier=find.company.idCompany) INNER JOIN find.company ON freight.idProducer=find.company.idCompany) WHERE freight.idSupplier IS NOT NULL;"
    return request.query(sql,[]);
}
async function getFreight()
{
    sql="SELECT * FROM freight"
    return request.query(sql,[]);
}
async function getFreightProducerTaken(id)
{       
    let sql="SELECT freight.idFreight, freight.weight,freight.length,freight.warehouse,freight.destination,freight.note,freight.price,find.company.companyName,find.company.VAT,find.company.email,status.statusName,find.load.loadType FROM (((freight INNER JOIN status ON freight.idStatus=status.idStatus) INNER JOIN find.load ON freight.idLoad=find.load.idLoad)INNER JOIN find.company ON freight.idSupplier=find.company.idCompany) WHERE idProducer=? && freight.idStatus=2;"
    return request.query(sql,[id]);
}
async function getFreightProducerCompleted(id)
{       
    let sql="SELECT freight.idFreight, freight.weight,freight.length,freight.warehouse,freight.destination,freight.note,freight.price,find.company.companyName,find.company.VAT,find.company.email,status.statusName,find.load.loadType FROM (((freight INNER JOIN status ON freight.idStatus=status.idStatus) INNER JOIN find.load ON freight.idLoad=find.load.idLoad)INNER JOIN find.company ON freight.idSupplier=find.company.idCompany) WHERE idProducer=? && freight.idStatus=3;"
    return request.query(sql,[id]);
}
async function getFreightProducerFree(id)
{
    let sql="SELECT freight.idFreight,freight.weight,freight.length,freight.warehouse,freight.destination,freight.note,freight.price,status.statusName, find.load.idLoad, find.load.loadType FROM ((freight INNER JOIN status ON freight.idStatus=status.idStatus) INNER JOIN find.load ON freight.idLoad=find.load.idLoad) WHERE idProducer=? && idSupplier IS NULL;"
    return request.query(sql,[id]);
}
async function getFreightSupplierFree()
{
    let sql="SELECT freight.idFreight,freight.weight,freight.length,freight.warehouse,freight.destination,freight.note,freight.price,load.loadType, find.company.companyName,find.company.VAT,find.company.email, load.loadType FROM (((freight INNER JOIN status ON freight.idStatus=status.idStatus) INNER JOIN find.load ON freight.idLoad=find.load.idLoad)INNER JOIN find.company ON freight.idProducer=find.company.idCompany) WHERE idSupplier IS NULL;"
    return request.query(sql,[]);
}
async function getFreightSupplierTaken(id)
{
    let sql="SELECT freight.idFreight,freight.weight,freight.length,freight.warehouse,freight.destination,freight.note,freight.price,status.statusName,load.loadType, find.company.companyName,find.company.VAT,find.company.email, load.loadType FROM (((freight INNER JOIN status ON freight.idStatus=status.idStatus) INNER JOIN find.load ON freight.idLoad=find.load.idLoad)INNER JOIN find.company ON freight.idProducer=find.company.idCompany) WHERE idSupplier=? && freight.idStatus=2;"
    return request.query(sql,[id]);
}
async function getFreightSupplierCompleted(id)
{
    let sql="SELECT freight.idFreight,freight.weight,freight.length,freight.warehouse,freight.destination,freight.note,freight.price,status.statusName,load.loadType, find.company.companyName,find.company.VAT,find.company.email, load.loadType FROM (((freight INNER JOIN status ON freight.idStatus=status.idStatus) INNER JOIN find.load ON freight.idLoad=find.load.idLoad)INNER JOIN find.company ON freight.idProducer=find.company.idCompany) WHERE idSupplier=? && freight.idStatus=3;"
    return request.query(sql,[id]);
}
async function getCompletedFreights()
{
    let sql="SELECT freight.idFreight,freight.weight,freight.length,freight.warehouse,freight.destination,freight.note,freight.price,status.statusName,load.loadType, find.company.companyName,find.company.VAT,find.company.email, load.loadType FROM (((freight INNER JOIN status ON freight.idStatus=status.idStatus) INNER JOIN find.load ON freight.idLoad=find.load.idLoad)INNER JOIN find.company ON freight.idProducer=find.company.idCompany) WHERE freight.idStatus=3;"
    return request.query(sql,[]);
}

async function getLoads()
{
    sql= "SELECT * FROM find.load"
    return request.query(sql,[]);
}

async function takeFreight(idSuplier,idFreight)
{
    let sql="UPDATE find.freight SET freight.idSupplier=?, freight.idStatus=2 WHERE freight.idFreight=?"
    return request.query(sql,[idSuplier,idFreight]);
}
async function updateFreight(weight,length,warehouse,destination,note,price,idLoad,id)
{
    let sql="UPDATE find.freight SET freight.weight=?,freight.length=?,freight.warehouse=?,freight.destination=?,freight.note=?,freight.price=?,freight.idLoad=? WHERE idFreight=?"
    return request.query(sql,[weight,length,warehouse,destination,note,price,idLoad,id]);
}
async function getFreightId (id)
{
    let sql ="SELECT freight.weight,freight.length,freight.warehouse,freight.destination,freight.note,freight.price,load.idLoad, load.loadType FROM (freight INNER JOIN find.load ON freight.idLoad=load.idLoad) WHERE idFreight=?"
    return request.query(sql,[id]);
}
async function finishFreight(id)
{
    let sql="UPDATE freight SET freight.idStatus=3 WHERE idFreight=?"
    return request.query(sql,[id]);
}
async function cancelFreight(id)
{
    let sql="UPDATE freight SET freight.idSupplier=NULL, freight.idStatus=1 WHERE idFreight=?"
    return request.query(sql,[id]);
}
async function deleteFreight(id)
{
    sql= "DELETE FROM freight WHERE idFreight=?"
    return request.query(sql,[id]);
}

exports.getCompletedFreights=getCompletedFreights;
exports.getFreightProducerCompleted=getFreightProducerCompleted;
exports.getFreightSupplierCompleted=getFreightSupplierCompleted;
exports.getLoad=getLoad;
exports.getRole=getRole;
exports.getRoleName=getRoleName;
exports.getCompany=getCompany;
exports.getCompanyId=getCompanyId;
exports.getCompanyEmail=getCompanyEmail;
exports.sendCompany=sendCompany;
exports.deleteCompany=deleteCompany;
exports.updateCompany=updateCompany;
exports.getAdminId=getAdminId;
exports.getAdminEmail=getAdminEmail;
exports.sendAdmin=sendAdmin;
exports.updateAdmin=updateAdmin;
exports.deleteAdmin=deleteAdmin;
exports.sendFreight=sendFreight;
exports.getFreight=getFreight;
exports.getFreightTaken=getFreightTaken;
exports.getFreightProducerFree=getFreightProducerFree;
exports.getFreightProducerTaken=getFreightProducerTaken;
exports.getFreightSupplierFree=getFreightSupplierFree;
exports.getFreightSupplierTaken=getFreightSupplierTaken;
exports.getLoads = getLoads;
exports.takeFreight=takeFreight;
exports.updateFreight=updateFreight;
exports.getFreightId=getFreightId;
exports.finishFreight=finishFreight;
exports.cancelFreight=cancelFreight;
exports.deleteFreight=deleteFreight;