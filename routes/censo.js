const {Router}=require("express")

const route=Router();

route.get("/:id",(req,res)=>{


    req.getConnection((err,conn)=>{
        if(err) return res.send(err);
        conn.query(`SELECT * FROM empresa where CENSISTA_ID = ?`,[req.params.id],async(err,rows)=>{
            if(err) return res.send(err);
            res.json(rows);
        })
    })
})

route.post("/",(req,res)=>{
    const {CENSISTA_ID,
        NOMBRE_COMERCIAL,RUC,DIRECCION,COORD_X,
        COORD_Y,BARRIO,MANZANA,
        TELEFONO,CELULAR,CORREO,
        ACTIVIDAD_PRINCIPAL,PRODUCTO_COMERCIALIZADO,
        ANIO_INICIO,TIPO_EMPRESA,CONDICION_JURIDICA,
        PRESTAMO_FINANCIAMIENTO,LUGAR_CREDITO,CAUSA_NO_CREDITO,
        CUENTA_BANCARIA,MOTIVO_NO_CUENTA,
        //Falta gastos totales
        GASTOS_MATERIAS_PRIMAS,GASTOS_COMPRA_ENVASES,GASTOS_MERCADERIAS_REVENTA,
        GASTOS_MATERIALES_PRESTACION,GASTOS_SUBCONTRATACION,GASTOS_PAGO_SUMINISTRO,
        GASTOS_PAGO_COMISIONES,GASTOS_PAGO_AGUA,GASTOS_COMPRA_COMBUSTIBLE,GASTOS_CONSUMO_ELECTRICIDAD,
        GASTOS_REPARACIONES,GASTOS_ALQUILER_MAQUINAS,GASTOS_ALQUILER_EDIFICIOS,GASTOS_ALQUILER_TERRENO,
        GASTOS_SERVICIOS_COMUNICACION,GASTOS_TRANSPORTE_CARGA,GASTOS_OTROS_TITULO,GASTOS_OTROS_NUMERO,
        //Falta ingresos totales
        INGRESOS_PRODUCTOS_ELABORADOS,INGRESOS_PRESTACION_SERVICIOS,INGRESOS_REVENTA_MERCADERIAS,
        INGRESOS_SUBCONTRATACION,INGRESOS_ALQUILER_MAQUINAS,INGRESOS_OTROS_TITULO,
        INGRESOS_OTROS_NUMERO,INTERESES_DEPOSITOS,
        
        IVA_CREDITO_FISCAL,IVA_DEBITO_FISCAL,IMPUESTO_RENTA,
        
        HOMBRE_PERSONAS_REMUNERADAS,HOMBRE_PERSONAS_NO_REMUNERADAS,HOMBRE_PERSONAL_TERCERIZADO,
        HOMBRE_SUELDOS,HOMBRE_OTRAS_REMUNERACIONES,HOMBRE_INDEMNIZACION,

        MUJER_PERSONAS_REMUNERADAS,MUJER_PERSONAS_NO_REMUNERADAS,MUJER_PERSONAL_TERCERIZADO,
        MUJER_SUELDOS,MUJER_OTRAS_REMUNERACIONES,MUJER_INDEMNIZACION,
        }=req.body;

        //Calculando gastos totales para agregarlos a la base de datos
        let gastosASumar=[
            GASTOS_MATERIAS_PRIMAS, GASTOS_COMPRA_ENVASES, GASTOS_MERCADERIAS_REVENTA,
            GASTOS_MATERIALES_PRESTACION, GASTOS_SUBCONTRATACION, GASTOS_PAGO_SUMINISTRO,
            GASTOS_PAGO_COMISIONES, GASTOS_PAGO_AGUA, GASTOS_COMPRA_COMBUSTIBLE,
            GASTOS_CONSUMO_ELECTRICIDAD, GASTOS_REPARACIONES, GASTOS_ALQUILER_MAQUINAS,
            GASTOS_ALQUILER_EDIFICIOS,GASTOS_ALQUILER_TERRENO,GASTOS_SERVICIOS_COMUNICACION,
            GASTOS_TRANSPORTE_CARGA, GASTOS_TRANSPORTE_CARGA
        ];
        let GASTOS_TOTALES=0;
        gastosASumar.forEach(el=>{
            let newNum=parseInt(el)
            if(isNaN(newNum)){
                GASTOS_TOTALES+=0;
            }else{
                GASTOS_TOTALES+=newNum;
            }
        })
        //Calculando los ingresos totales para agregarlos a la base de datos
        let ingresosASumar=[
            INGRESOS_PRODUCTOS_ELABORADOS,  INGRESOS_PRESTACION_SERVICIOS,
            INGRESOS_REVENTA_MERCADERIAS,  INGRESOS_SUBCONTRATACION,
            INGRESOS_ALQUILER_MAQUINAS,  INGRESOS_OTROS_NUMERO
        ]
        let INGRESOS_TOTALES=0;
        ingresosASumar.forEach(el=>{
            let newNum=parseInt(el)
            if(isNaN(newNum)){
                INGRESOS_TOTALES+=0;
            }else{
                INGRESOS_TOTALES+=newNum;
            }
        })
        //Calculando pagos y remuneraciones
        let TOTAL_PERSONAS_REMUNERADAS;
        let TOTAL_PERSONAS_NO_REMUNERADAS;
        let TOTAL_PERSONAL_TERCERIZADO;
        let TOTAL_SUELDOS;
        let TOTAL_OTRAS_REMUNERACIONES;
        let TOTAL_INDEMNIZACION;    
        TOTAL_PERSONAS_REMUNERADAS=parseInt(HOMBRE_PERSONAS_REMUNERADAS)+parseInt(MUJER_PERSONAS_REMUNERADAS);         
        TOTAL_PERSONAS_NO_REMUNERADAS=parseInt(HOMBRE_PERSONAS_NO_REMUNERADAS)+parseInt(MUJER_PERSONAS_NO_REMUNERADAS);
        TOTAL_PERSONAL_TERCERIZADO=parseInt(HOMBRE_PERSONAL_TERCERIZADO)+parseInt(MUJER_PERSONAL_TERCERIZADO);
        TOTAL_SUELDOS=parseInt(HOMBRE_SUELDOS)+parseInt(MUJER_SUELDOS);
        TOTAL_OTRAS_REMUNERACIONES=parseInt(HOMBRE_OTRAS_REMUNERACIONES)+parseInt(MUJER_OTRAS_REMUNERACIONES);
        TOTAL_INDEMNIZACION=parseInt(HOMBRE_INDEMNIZACION)+parseInt(MUJER_INDEMNIZACION)
    req.getConnection((err,conn)=>{
        if (err) return res.send(err)
        conn.query(`INSERT INTO empresa set ?`,[{CENSISTA_ID,
            NOMBRE_COMERCIAL,RUC,DIRECCION,COORD_X,
            COORD_Y,BARRIO,MANZANA,
            TELEFONO,CELULAR,CORREO,
            ACTIVIDAD_PRINCIPAL,PRODUCTO_COMERCIALIZADO,
            ANIO_INICIO,TIPO_EMPRESA,CONDICION_JURIDICA,
            PRESTAMO_FINANCIAMIENTO,LUGAR_CREDITO,CAUSA_NO_CREDITO,
            CUENTA_BANCARIA,MOTIVO_NO_CUENTA,

            GASTOS_MATERIAS_PRIMAS,GASTOS_COMPRA_ENVASES,GASTOS_MERCADERIAS_REVENTA,
            GASTOS_MATERIALES_PRESTACION,GASTOS_SUBCONTRATACION,GASTOS_PAGO_SUMINISTRO,
            GASTOS_PAGO_COMISIONES,GASTOS_PAGO_AGUA,GASTOS_COMPRA_COMBUSTIBLE,GASTOS_CONSUMO_ELECTRICIDAD,
            GASTOS_REPARACIONES,GASTOS_ALQUILER_MAQUINAS,GASTOS_ALQUILER_TERRENO,
            GASTOS_ALQUILER_EDIFICIOS,GASTOS_SERVICIOS_COMUNICACION,
            GASTOS_TRANSPORTE_CARGA,GASTOS_OTROS_TITULO,GASTOS_OTROS_NUMERO,GASTOS_TOTALES,

            INGRESOS_PRODUCTOS_ELABORADOS,INGRESOS_PRESTACION_SERVICIOS,INGRESOS_REVENTA_MERCADERIAS,
            INGRESOS_SUBCONTRATACION,INGRESOS_ALQUILER_MAQUINAS,INGRESOS_OTROS_TITULO,
            INGRESOS_OTROS_NUMERO,INGRESOS_TOTALES,INTERESES_DEPOSITOS,

            IVA_CREDITO_FISCAL,IVA_DEBITO_FISCAL,IMPUESTO_RENTA,
            
            HOMBRE_PERSONAS_REMUNERADAS,HOMBRE_PERSONAS_NO_REMUNERADAS,HOMBRE_PERSONAL_TERCERIZADO,
            HOMBRE_SUELDOS,HOMBRE_OTRAS_REMUNERACIONES,HOMBRE_INDEMNIZACION,

            MUJER_PERSONAS_REMUNERADAS,MUJER_PERSONAS_NO_REMUNERADAS,MUJER_PERSONAL_TERCERIZADO,
            MUJER_SUELDOS,MUJER_OTRAS_REMUNERACIONES,MUJER_INDEMNIZACION,

            TOTAL_PERSONAS_REMUNERADAS,TOTAL_PERSONAS_NO_REMUNERADAS,TOTAL_PERSONAL_TERCERIZADO,
            TOTAL_SUELDOS,TOTAL_OTRAS_REMUNERACIONES,TOTAL_INDEMNIZACION
            }],(err,rows)=>{
                
            if(err) res.send(err);
            res.json({msg:"Censo enviado exitosamente"})
        })
    })
})

route.put("/:id",(req,res)=>{
    const {CENSISTA_ID,
        NOMBRE_COMERCIAL,RUC,DIRECCION,COORD_X,
        COORD_Y,BARRIO,MANZANA,
        TELEFONO,CELULAR,CORREO,
        ACTIVIDAD_PRINCIPAL,PRODUCTO_COMERCIALIZADO,
        ANIO_INICIO,TIPO_EMPRESA,CONDICION_JURIDICA,
        PRESTAMO_FINANCIAMIENTO,LUGAR_CREDITO,CAUSA_NO_CREDITO,
        CUENTA_BANCARIA,MOTIVO_NO_CUENTA,
        //Falta gastos totales
        GASTOS_MATERIAS_PRIMAS,GASTOS_COMPRA_ENVASES,GASTOS_MERCADERIAS_REVENTA,
        GASTOS_MATERIALES_PRESTACION,GASTOS_SUBCONTRATACION,GASTOS_PAGO_SUMINISTRO,
        GASTOS_PAGO_COMISIONES,GASTOS_PAGO_AGUA,GASTOS_COMPRA_COMBUSTIBLE,GASTOS_CONSUMO_ELECTRICIDAD,
        GASTOS_REPARACIONES,GASTOS_ALQUILER_MAQUINAS,GASTOS_ALQUILER_EDIFICIOS,GASTOS_ALQUILER_TERRENO,
        GASTOS_SERVICIOS_COMUNICACION,GASTOS_TRANSPORTE_CARGA,GASTOS_OTROS_TITULO,GASTOS_OTROS_NUMERO,
        //Falta ingresos totales
        INGRESOS_PRODUCTOS_ELABORADOS,INGRESOS_PRESTACION_SERVICIOS,INGRESOS_REVENTA_MERCADERIAS,
        INGRESOS_SUBCONTRATACION,INGRESOS_ALQUILER_MAQUINAS,INGRESOS_OTROS_TITULO,
        INGRESOS_OTROS_NUMERO,INTERESES_DEPOSITOS,
        
        IVA_CREDITO_FISCAL,IVA_DEBITO_FISCAL,IMPUESTO_RENTA,
        
        HOMBRE_PERSONAS_REMUNERADAS,HOMBRE_PERSONAS_NO_REMUNERADAS,HOMBRE_PERSONAL_TERCERIZADO,
        HOMBRE_SUELDOS,HOMBRE_OTRAS_REMUNERACIONES,HOMBRE_INDEMNIZACION,

        MUJER_PERSONAS_REMUNERADAS,MUJER_PERSONAS_NO_REMUNERADAS,MUJER_PERSONAL_TERCERIZADO,
        MUJER_SUELDOS,MUJER_OTRAS_REMUNERACIONES,MUJER_INDEMNIZACION,
        }=req.body
        //Calculando gastos totales para agregarlos a la base de datos
        let gastosASumar=[
            GASTOS_MATERIAS_PRIMAS, GASTOS_COMPRA_ENVASES, GASTOS_MERCADERIAS_REVENTA,
            GASTOS_MATERIALES_PRESTACION, GASTOS_SUBCONTRATACION, GASTOS_PAGO_SUMINISTRO,
            GASTOS_PAGO_COMISIONES, GASTOS_PAGO_AGUA, GASTOS_COMPRA_COMBUSTIBLE,
            GASTOS_CONSUMO_ELECTRICIDAD, GASTOS_REPARACIONES, GASTOS_ALQUILER_MAQUINAS,
            GASTOS_ALQUILER_EDIFICIOS,GASTOS_ALQUILER_TERRENO,GASTOS_SERVICIOS_COMUNICACION,
            GASTOS_TRANSPORTE_CARGA, GASTOS_TRANSPORTE_CARGA
        ];
        let GASTOS_TOTALES=0;
        gastosASumar.forEach(el=>{
            let newNum=parseInt(el)
            if(isNaN(newNum)){
                GASTOS_TOTALES+=0;
            }else{
                GASTOS_TOTALES+=newNum;
            }
        })
        //Calculando los ingresos totales para agregarlos a la base de datos
        let ingresosASumar=[
            INGRESOS_PRODUCTOS_ELABORADOS,  INGRESOS_PRESTACION_SERVICIOS,
            INGRESOS_REVENTA_MERCADERIAS,  INGRESOS_SUBCONTRATACION,
            INGRESOS_ALQUILER_MAQUINAS,  INGRESOS_OTROS_NUMERO
        ]
        let INGRESOS_TOTALES=0;
        ingresosASumar.forEach(el=>{
            let newNum=parseInt(el)
            if(isNaN(newNum)){
                INGRESOS_TOTALES+=0;
            }else{
                INGRESOS_TOTALES+=newNum;
            }
        })
        //Calculando pagos y remuneraciones
        let TOTAL_PERSONAS_REMUNERADAS;
        let TOTAL_PERSONAS_NO_REMUNERADAS;
        let TOTAL_PERSONAL_TERCERIZADO;
        let TOTAL_SUELDOS;
        let TOTAL_OTRAS_REMUNERACIONES;
        let TOTAL_INDEMNIZACION;    
        TOTAL_PERSONAS_REMUNERADAS=parseInt(HOMBRE_PERSONAS_REMUNERADAS)+parseInt(MUJER_PERSONAS_REMUNERADAS);         
        TOTAL_PERSONAS_NO_REMUNERADAS=parseInt(HOMBRE_PERSONAS_NO_REMUNERADAS)+parseInt(MUJER_PERSONAS_NO_REMUNERADAS);
        TOTAL_PERSONAL_TERCERIZADO=parseInt(HOMBRE_PERSONAL_TERCERIZADO)+parseInt(MUJER_PERSONAL_TERCERIZADO);
        TOTAL_SUELDOS=parseInt(HOMBRE_SUELDOS)+parseInt(MUJER_SUELDOS);
        TOTAL_OTRAS_REMUNERACIONES=parseInt(HOMBRE_OTRAS_REMUNERACIONES)+parseInt(MUJER_OTRAS_REMUNERACIONES);
        TOTAL_INDEMNIZACION=parseInt(HOMBRE_INDEMNIZACION)+parseInt(MUJER_INDEMNIZACION)

    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        conn.query(`UPDATE empresa set ? where ID = ?`,[{CENSISTA_ID,
            NOMBRE_COMERCIAL,RUC,DIRECCION,COORD_X,
            COORD_Y,BARRIO,MANZANA,
            TELEFONO,CELULAR,CORREO,
            ACTIVIDAD_PRINCIPAL,PRODUCTO_COMERCIALIZADO,
            ANIO_INICIO,TIPO_EMPRESA,CONDICION_JURIDICA,
            PRESTAMO_FINANCIAMIENTO,LUGAR_CREDITO,CAUSA_NO_CREDITO,
            CUENTA_BANCARIA,MOTIVO_NO_CUENTA,

            GASTOS_MATERIAS_PRIMAS,GASTOS_COMPRA_ENVASES,GASTOS_MERCADERIAS_REVENTA,
            GASTOS_MATERIALES_PRESTACION,GASTOS_SUBCONTRATACION,GASTOS_PAGO_SUMINISTRO,
            GASTOS_PAGO_COMISIONES,GASTOS_PAGO_AGUA,GASTOS_COMPRA_COMBUSTIBLE,GASTOS_CONSUMO_ELECTRICIDAD,
            GASTOS_REPARACIONES,GASTOS_ALQUILER_MAQUINAS,GASTOS_ALQUILER_TERRENO,
            GASTOS_ALQUILER_EDIFICIOS,GASTOS_SERVICIOS_COMUNICACION,
            GASTOS_TRANSPORTE_CARGA,GASTOS_OTROS_TITULO,GASTOS_OTROS_NUMERO,GASTOS_TOTALES,

            INGRESOS_PRODUCTOS_ELABORADOS,INGRESOS_PRESTACION_SERVICIOS,INGRESOS_REVENTA_MERCADERIAS,
            INGRESOS_SUBCONTRATACION,INGRESOS_ALQUILER_MAQUINAS,INGRESOS_OTROS_TITULO,
            INGRESOS_OTROS_NUMERO,INGRESOS_TOTALES,INTERESES_DEPOSITOS,

            IVA_CREDITO_FISCAL,IVA_DEBITO_FISCAL,IMPUESTO_RENTA,
            
            HOMBRE_PERSONAS_REMUNERADAS,HOMBRE_PERSONAS_NO_REMUNERADAS,HOMBRE_PERSONAL_TERCERIZADO,
            HOMBRE_SUELDOS,HOMBRE_OTRAS_REMUNERACIONES,HOMBRE_INDEMNIZACION,

            MUJER_PERSONAS_REMUNERADAS,MUJER_PERSONAS_NO_REMUNERADAS,MUJER_PERSONAL_TERCERIZADO,
            MUJER_SUELDOS,MUJER_OTRAS_REMUNERACIONES,MUJER_INDEMNIZACION,

            TOTAL_PERSONAS_REMUNERADAS,TOTAL_PERSONAS_NO_REMUNERADAS,TOTAL_PERSONAL_TERCERIZADO,
            TOTAL_SUELDOS,TOTAL_OTRAS_REMUNERACIONES,TOTAL_INDEMNIZACION
            },req.params.id],(err,rows)=>{
                if (err) return res.send(err)
                res.json({msg:"Censo editado exitosamente"})
            })
    })
})
route.delete("/:id",(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        conn.query("DELETE empresa where ID = ?",[req.params.id],(err,rows)=>{
            if(err) return res.send(err)
            res.json({msg:"Censo eliminado exitosamente"})
        })
    })
})
module.exports=route;
