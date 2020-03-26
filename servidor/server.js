const express = require('express');
const bodyParser = require("body-parser");
const server = express();
const cors = require('cors');

server.use(cors());
server.use(bodyParser.json());

let art =  [
    {
        nombre: "pelota",
        descripciones: "pelota de futbol usada en el Maracana",
        estado: "en stock" 
    },
    {
        nombre: "gafas",
        descripciones: "fueron usadas por la Coca Sarli",
        estado: "sin stock" 
    }
];

let usuarios = [
    {
        nombre : "gabino",
        contresena:"holamundo",
        mail: "gabino@gmail.com",
        articulos:art
    },
    {
        nombre : "micaela",
        contresena:"rosas",
        mail: "mica@gmail.com",
        articulos: [
            {
                nombre: "jeans",
                descripciones: "tienen un guraco",
                estado: "en stock" 
            },
            {
                nombre: "alcohol en gel",
                descripciones: "con aloe vera",
                estado: "sin stock" 
            }
        ]
    }
];


server.listen(3000, () => {
    console.log("se ha iniciado el server");
});


server.get('/usuarios', (req,res) =>{
    res.send(usuarios);
});


server.post("/usuarios",(req,res) =>{
    usuarios.push(req.body);
    res.json("se agrego un usuario nuevo");
});


