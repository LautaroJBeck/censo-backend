const {Router} =require("express");
const {check}=require("express-validator");
const { validarCampos } = require("../helpers/validarCampos");
const jwt=require("jsonwebtoken")
const bcryptjs =require("bcryptjs");
const generarJWT = require("../helpers/generarJWT");


const ruta=Router();

ruta.post("/",[
    check("ci","No introdujiste tu número de cédula").not().isEmpty(),
    check("password","No introdujiste tu contraseña").not().isEmpty(),
    validarCampos
],(req,res)=>{
    
    let {ci,password}=req.body;

    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query(`SELECT * FROM usuario WHERE CI = ?`,[ci],async(err,rows)=>{
            if(err) return res.send(err)
            
            //Validar contraseña

            if(rows.length>0){
                let validPassword=bcryptjs.compareSync(password,rows[0].PASSWORD);
                if(!validPassword){
                    return res.status(400).json({
                        msg:"La contraseña no es valida",
                        error:true
                    })
                }
                //Generar el json web token
                let {ID,CI,NOMBRE,ROL}=rows[0];
                const token=await generarJWT(ID,CI,NOMBRE,ROL)
    
                res.json({
                    token,
                    error:null
                })
            }else{
                res.json({
                    msg:"No existe ese usuario",
                    error:true
                })
            }

        })

    })
})
ruta.post("/token",(req,res)=>{
    try{
        const {token}=req.body

        if(!token){
            return res.status(400).json({
                msg:"No tienes autorización"
            })
        }
        const decoded=jwt.verify(token,process.env.PRIVATE_KEY);
        res.json({
            decoded
        })
    }catch(err){console.log(err)}
})
module.exports=ruta;