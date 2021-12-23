const {Router} =require("express");
const {check}=require("express-validator");
const { validarCampos } = require("../helpers/validarCampos");
const bcryptjs=require("bcryptjs")
const ruta=Router();

//Para los usuarios
ruta.get("/",(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query(`SELECT * FROM usuario`,(err,rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })

    })
});
ruta.post("/",[
    check("ci","No introdujiste el número de cédula").not().isEmpty(),
    check("ci","El CI tiene que ser un número").isNumeric(),
    check("nombre","No introdujiste el nombre").not().isEmpty(),
    check("password","No introdujiste la contraseña").not().isEmpty(),
    check("rol","No introdujiste el rol ").not().isEmpty(),
    validarCampos
],(req,res)=>{

    let {ci,nombre,password,rol}=req.body;
    
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    let passwordEncrypted= bcryptjs.hashSync(password,salt)
    password=passwordEncrypted


    //Guardar en la base de datos 
    req.getConnection((err,conn)=>{
        if (err) return res.send(err)

        conn.query("INSERT INTO usuario set ?",[{ci,nombre,password,rol}],(err,rows)=>{
            if (err) return res.send(err)

            res.json({msg:"usuario añadido",success:true})
        })
    })
})
ruta.put("/:ci",(req,res)=>{
    const {ci,nombre,password,rol}=req.body;


    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    let passwordEncrypted= bcryptjs.hashSync(password,salt)
    password=passwordEncrypted

    //Modificar en la base de datos
    req.getConnection((err,conn)=>{
        if (err) return res.send(err)

    conn.query("UPDATE usuario set ? WHERE ci = ?",[{ci,nombre,password,rol},req.params.ci],(err,rows)=>{
        if (err) return res.send(err)

        res.json({msg:"usuario editado"})
        })
    })
})
ruta.delete("/:ci",(req,res)=>{
    //Eliminar de la base de datos 
    req.getConnection((err,conn)=>{
        if (err) return res.send(err)

        conn.query("DELETE FROM usuario WHERE CI = ?",[req.params.ci],(err,rows)=>{
            if (err) return res.send(err)

            res.json({msg:"usuario eliminado"})
        })
    })
})
module.exports=ruta