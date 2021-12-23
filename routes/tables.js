const {Router} =require("express");

const route=Router();

route.get("/:table",(req,res)=>{
    const table=req.params.table;
    req.getConnection((err,conn)=>{
        conn.query(`SELECT * FROM ${table}`,[],(err,rows)=>{
            res.json(rows);
        })
    })
})

module.exports=route;