const express = require('express');
const cors = require('cors'); // para evitar restricciones entre llamadas de sitios
const categoria = express.Router();  // trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clients
const conex = require('./bdatos');
//const url_permitida = "http://127.0.0.1:5500"; //evitar el error de politicas de cors


//middlewares requeridos
//middlewares: logica de intercambio entre las aplicaciones, traductor de datos entre aplicaciones distribuidas
categoria.use(express.json()); //serializa la data en JSON
categoria.use(cors());
categoria.options('*', cors());



// construimos los endpoint
// listar todos usamos el GET

categoria.get('/categoria', (req, res) => {
    conex.query("SELECT * FROM categoria", (error, respuesta) => {
        if (error) {
            throw error;
        } else {
            res.send(respuesta)
        }
    });
})

// insertar un registro

 categoria.post('/categoria', (req, res) => {
    let data = {
        nombre: req.body.nombre,
        imagen: req.body.imagen,
      };
    
    conex.query("INSERT INTO categoria set ?", data, (error, respuesta) => {
        if (error) {
            console.log(error);
        } else {
            res.status(201).send(respuesta)
        }
    });
})
// editar

categoria.put('/categoria', (req, res) => {
    let id = req.params.id;
    let datos = {
        nombre: req.body.nombre,
        imagen: req.body.imagen,
    };
    conex.query("UPDATE categoria SET  ? where id = ?", [datos, id]), (error, respuesta) => {
        if (error) {
            console.log(error);
        } else {
            res.status(201)
            //  res.status(201).send(respuesta)
        }
    }

})
//borrar

categoria.delete('/categoria', (req, res) => {
    let id = req.params.id;
    conex.query("DELETE FROM categoria where id = ?", id), (error, respuesta) => {
        if (error) {
            console.log(error);
        } else {
            //res.status(201)
            res.status(201).send(respuesta)
        }
    }

}) 

module.exports = categoria