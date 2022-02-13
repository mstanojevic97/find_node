const mysql=require('mysql');
let pool=null;
exports.initPool=()=>{
    pool= mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : "find"
});
}


exports.query=function(sql,params)
{
    return new Promise((resolve)=>
    {
        pool.query(sql,params,(err,result)=>
        {
            //console.log(err);
            resolve(result)
        }
        )
    })
}