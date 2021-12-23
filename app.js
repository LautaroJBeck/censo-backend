//Importaciones
require("dotenv").config();
const express=require("express");
const mysql=require("mysql");
const myconn=require("express-myconnection");

const cors=require("cors");
const app=express();
app.set("PORT",process.env.PORT || 8000)
const dbOptions={
    host:`localhost`,
    user:"root",
    password:"lautarobeck66",
    port:3307,
    database:"proyecto_01",
    insecureAuth:true
}
//Middlewares

app.use(myconn(mysql,dbOptions,`single`))
app.use(cors())
app.use(express.json())
app.use("/api/admin",require("./routes/administrador"))
app.use("/api/login",require("./routes/login"))
app.use("/api/censo",require("./routes/censo"))
app.use("/api/tables",require("./routes/tables"))


module.exports=app;