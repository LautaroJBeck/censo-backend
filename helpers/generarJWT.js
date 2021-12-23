const jwt=require("jsonwebtoken")

const generarJWT=(ID,CI,NOMBRE,ROL)=>{
    console.log({ID,CI,NOMBRE,ROL})
    return new Promise ((resolve,reject)=>{
        let payload={ID,CI,NOMBRE,ROL};

        jwt.sign(payload,process.env.PRIVATE_KEY,{
            expiresIn:"31d",
        },(err,token)=>{
            if(err){
                console.log(err)
                reject("No se pudo generar el token")
            }else{
                resolve(token)
            }
        })
    })
     
}

module.exports=generarJWT
