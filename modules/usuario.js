const express = require("express");
const cors = require("cors"); // para evitar restricciones entre llamadas de sitios
const usuario = express.Router(); // trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clients
const conex = require("./bdatos");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util"); //la trae por defecto NODE.JS me permite usar async/await opcion a fetch
const { error } = require("console");
const { PassThrough } = require("stream");
//const url_permitida = "http://127.0.0.1:5500"; //evitar el error de politicas de cors

//middlewares requeridos
//middlewares: logica de intercambio entre las aplicaciones, traductor de datos entre aplicaciones distribuidas
usuario.use(express.json()); //serializa la data en JSON
usuario.use(cors());
usuario.options("*", cors());

usuario.get("/usuario", async (req, res) => {
  try {
    conex.query(
      "select idUsuario,nombre,email,contraseña,direccion from usuario",
      (error, respuesta) => {
        console.log(respuesta);
        res.send(respuesta);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// usuario.get("/usuario", (req, res) => {
//   conex.query("SELECT * FROM usuario", (error, respuesta) => {
//     if (error) {
//       throw error;
//     } else {
//       res.send(respuesta);
//     }
//   });
// });

// insertar un registro

usuario.post("/usuario", async (req, res) => {
  try {
    let data = {
      nombre: req.body.nombre,
      email: req.body.email,
      contraseña: bcrypt.hashSync(req.body.contraseña, 7),
      direccion: req.body.direccion,
      ciudad: req.body.ciudad,
      zonaPostal: req.body.zonaPostal,
      telefono: req.body.telefono,
      esAdmin: req.body.esAdmin,
    };

    conex.query("insert into usuario set?", [data], (error, respuesta) => {
      console.log(respuesta);
      //res.send("insecion exitosa");
      res.send(true);
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// usuario.post("/usuario", (req, res) => {
//   let data = {
//     numero: req.body.numero,
//     email: req.body.email,
//     contraseña: req.body.contraseña,
//     direccion: req.body.direccion,
//     ciudad: req.body.ciudad,
//     zonaPostal: req.body.zonaPostal,
//     telefono: req.body.telefono,
//     esAdmin: req.body.esAdmin,
//   };

//   conex.query("INSERT INTO usuario set ?", data, (error, respuesta) => {
//     if (error) {
//       console.log(error);
//     } else {
//       res.status(201).send(respuesta);
//     }
//   });
// });
// editar

usuario.put("/usuario", (req, res) => {
  let id = req.params.id;
  let datos = {
    numero: req.body.numero,
    email: req.body.email,
    contraseña: req.body.contraseña,
    direccion: req.body.direccion,
    ciudad: req.body.ciudad,
    zonaPostal: req.body.zonaPostal,
    telefono: req.body.telefono,
    esAdmin: req.body.esAdmin,
  };
  conex.query("UPDATE usuario SET  ? where id = ?", [datos, id]),
    (error, respuesta) => {
      if (error) {
        console.log(error);
      } else {
        res.status(201);
        //  res.status(201).send(respuesta)
      }
    };
});
//borrar

usuario.delete("/usuario", (req, res) => {
  let id = req.params.id;
  conex.query("DELETE FROM usuario where id = ?", id),
    (error, respuesta) => {
      if (error) {
        console.log(error);
      } else {
        //res.status(201)
        res.status(201).send(respuesta);
      }
    };
});

//login usuario

usuario.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const contraseña = req.body.contraseña;

    //validamos que llegue el email y la contraseña
    if (!email || !contraseña) {
      console.log("debe enviar los datos completos");
    } else {
      conex.query(
        "select * from usuario where email =?",
        [email],
        async (error, respuesta) => {
          if (respuesta.length == 0 ||!(await bcrypt.compare(contraseña, respuesta[0].contraseña))
          ) { 

            // res.sendStatus(404)
            // res.send({estado:true,nombre:"juanito"})
            // console.log("el usuario o clave ingresada no existe");
            res.send(false)
          } else {
            //Enviamos las variables al front end para que cargue la paguina
            // console.log("bienvenido al sistema de informacion");
            res.send(true)
          }
        }
      );
    }
  } catch (error) {
    res.send(true);
    // console.log("error en la red");
  }
});

module.exports = usuario;
