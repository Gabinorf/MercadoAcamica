const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const server = express();

server.use(bodyParser.json());

server.listen(3000, () => {
    console.log("se ha iniciado el server");
});

const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/mercadoacamica');

async function getUsuarios(){
    return await sequelize.query('SELECT * FROM usuarios',
        {type: sequelize.QueryTypes.SELECT})
        .then(res=>{
            return res
        })
};

async function getArticulos(){
    return await sequelize.query('SELECT * FROM articulos',
        {type: sequelize.QueryTypes.SELECT})
        .then(res=>{
            return res
        })
};

server.get("/usuarios", async (req,res)=>{
    
    let datos = await getUsuarios().then(resultado=>{
        return resultado
    });
    
    res.json(datos);
});

server.get("/articulos", async (req,res)=>{
    
    let datos = await getArticulos().then(resultado=>{
        return resultado
    });
    
    res.json(datos);
});

server.post("/usuario", async (req,res)=>{
    await sequelize.query("INSERT INTO usuarios VALUES (?, ?, ?, ?, ?)",
        {replacements: [req.body.id, req.body.nombre, req.body.apellido, req.body.email, req.body.contrasena]})
        .then(response=>{
            res.send("se agrego un usuario")
    })
})

server.post("/articulo", async (req,res)=>{
    await sequelize.query("INSERT INTO articulos VALUES (?, ?, ?, ?, ?)",
        {replacements: [req.body.id, req.body.nombre, req.body.descripcion, req.body.estado, req.body.id_usuario]})
        .then(response=>{
            res.send("se agrego un articulo")
    })
})

server.post("/compras", async (req,res)=>{
    await sequelize.query("INSERT INTO articulos_usuarios VALUES (?, ?, ?)",
        {replacements: [req.body.id, req.body.id_articulo, req.body.id_usuario]})
        .then(response=>{
            res.send("se agrego una nueva compra")
    })
})


