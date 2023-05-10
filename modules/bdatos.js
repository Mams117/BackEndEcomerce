
const mysql = require('mysql');  //instanciamos el modulo MYSQL

//Creamos la conexion
const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecomerce"
}
);

//Nos conectamos a la BD

conexion.connect((error) => {
    if (error) {
        throw 'existe un error en la cadena de conexion !'
    } else {
        console.log('Conexión Exitosa !');
    }
}
);
// Exporta este modulo para usarlo en otros modulos principio SRP Single-responsibility principle
module.exports = conexion