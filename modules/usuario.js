const express = require('express');
const cors = require('cors'); // para evitar restricciones entre llamadas de sitios
const usuario = express.Router();  // trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clients
const conex = require('./bdatos');
//const url_permitida = "http://127.0.0.1:5500"; //evitar el error de politicas de cors


//middlewares requeridos
//middlewares: logica de intercambio entre las aplicaciones, traductor de datos entre aplicaciones distribuidas
usuario.use(express.json()); //serializa la data en JSON
usuario.use(cors());
usuario.options('*', cors());


usuario.get('/usuario', (req, res) => {
    conex.query("SELECT * FROM usuario", (error, respuesta) => {
        if (error) {
            throw error;
        } else {
            res.send(respuesta)
        }
    });
})

// insertar un registro

 usuario.post('/usuario', (req, res) => {
    let data = {
        numero: req.body.numero,
        email: req.body.email,
        clave: req.body.clave,
       direccion: req.body.direccion,
        ciudad: req.body.ciudad,
        zonaPostal: req.body.zonaPostal,
        telefono: req.body.telefono,
        esAdmin: req.body.esAdmin,
      };
    
    conex.query("INSERT INTO usuario set ?", data, (error, respuesta) => {
        if (error) {
            console.log(error);
        } else {
            res.status(201).send(respuesta)
        }
    });
})
// editar

    usuario.put('/usuario', (req, res) => {
    let id = req.params.id;
    let datos = {
        numero: req.body.numero,
        email: req.body.email,
        clave: req.body.clave,
       direccion: req.body.direccion,
        ciudad: req.body.ciudad,
        zonaPostal: req.body.zonaPostal,
        telefono: req.body.telefono,
        esAdmin: req.body.esAdmin,
    };
    conex.query("UPDATE usuario SET  ? where id = ?", [datos, id]), (error, respuesta) => {
        if (error) {
            console.log(error);
        } else {
            res.status(201)
            //  res.status(201).send(respuesta)
        }
    }

})
//borrar

usuario.delete('/usuario', (req, res) => {
    let id = req.params.id;
    conex.query("DELETE FROM usuario where id = ?", id), (error, respuesta) => {
        if (error) {
            console.log(error);
        } else {
            //res.status(201)
            res.status(201).send(respuesta)
        }
    }

}) 



module.exports = usuario