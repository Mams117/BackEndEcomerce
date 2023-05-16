const express = require('express');
const cors = require('cors'); // para evitar restricciones entre llamadas de sitios
const pedido = express.Router();  // trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clients
const conex = require('./bdatos');
//const url_permitida = "http://127.0.0.1:5500"; //evitar el error de politicas de cors


//middlewares requeridos
//middlewares: logica de intercambio entre las aplicaciones, traductor de datos entre aplicaciones distribuidas
pedido.use(express.json()); //serializa la data en JSON
pedido.use(cors());
pedido.options('*', cors());


pedido.get('/pedido', (req, res) => {
    conex.query("SELECT * FROM pedido", (error, respuesta) => {
        if (error) {
            throw error;
        } else {
            res.send(respuesta)
        }
    });
})

// insertar un registro

 pedido.post('/pedido', (req, res) => {
    let data = {
        numero: req.body.numero,
        direccionEnvio: req.body.direccionEnvio,
        ciudad: req.body.ciudad,
        zonaPostal: req.body.zonaPostal,
        pais: req.body.pais,
        telefono: req.body.telefono,
        estado: req.body.estado,
        fecha: req.body.fecha,
      };
    
    conex.query("INSERT INTO pedido set ?", data, (error, respuesta) => {
        if (error) {
            console.log(error);
        } else {
            res.status(201).send(respuesta)
        }
    });
})
// editar

    pedido.put('/productos', (req, res) => {
    let id = req.params.id;
    let datos = {
        numero: req.body.numero,
        direccionEnvio: req.body.direccionEnvio,
        ciudad: req.body.ciudad,
        zonaPostal: req.body.zonaPostal,
        pais: req.body.pais,
        telefono: req.body.telefono,
        estado: req.body.estado,
        fecha: req.body.fecha,
    };
    conex.query("UPDATE pedido SET  ? where id = ?", [datos, id]), (error, respuesta) => {
        if (error) {
            console.log(error);
        } else {
            res.status(201)
            //  res.status(201).send(respuesta)
        }
    }

})
//borrar

pedido.delete('/productos', (req, res) => {
    let id = req.params.id;
    conex.query("DELETE FROM pedido where id = ?", id), (error, respuesta) => {
        if (error) {
            console.log(error);
        } else {
            //res.status(201)
            res.status(201).send(respuesta)
        }
    }

}) 



module.exports = pedido