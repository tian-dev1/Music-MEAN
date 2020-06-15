/* Archivo para el manejo de rutas de usuario */

const express = require('express');
const UserControl = require ('../controllers/userController');
//importar el paquete connect-multiparty
const multipart = require('connect-multiparty');
//A través de connect-multiparty, apuntamos a la carpeta que deseemos en que se guarden los archivos
const  subirImgDirectorio = multipart({uploadDir: './archivos/usuarios'});
var api = express.Router();

//Ruta Registrar usuario
api.post('/registerUser', UserControl.registerUser);

//Ruta Obtener todos los usuarios
api.get('/getAllUsers', UserControl.getAllUsers);

//Ruta Obtener todos los usuarios
api.get('/getUser/:id', UserControl.getUser);

//Ruta Actualizar usuario
api.put('/updateUser/:id', UserControl.updateUser);

//Ruta Eliminar usuario
api.delete('/deleteUser/:id', UserControl.deleteUser);



//Ruta Logueo de usuario
api.post('/login', UserControl.login);

//Ruta subir imagen usuario
api.put('/uploadImage/:id', subirImgDirectorio, UserControl.uploadImage);


//Exportar el modulo
module.exports = api;