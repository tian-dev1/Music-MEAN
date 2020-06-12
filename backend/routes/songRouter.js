/* Archivo para el manejo de rutas de canciones */

const express = require('express');
const SongControl = require ('../controllers/songController');
//importar el paquete connect-multiparty
//const multipart = require('connect-multiparty');
//A través de connect-multiparty, apuntamos a la carpeta que deseemos en que se guarden los archivos
//const  subirImgDirectorio = multipart({uploadDir: './archivos/usuarios'});
var api = express.Router();

//Ruta Registrar usuario
api.post('/registerSong', SongControl.registerSong);

//Ruta Obtener todos los usuarios
api.get('/getAllSongs', SongControl.getAllSongs);

//Ruta Obtener todos los usuarios
api.get('/getSong/:id', SongControl.getSong);

//Ruta Actualizar usuario
api.put('/updateSong/:id', SongControl.updateSong);

//Ruta Eliminar usuario
api.delete('/deleteSong/:id', SongControl.deleteSong);


//Exportar el modulo
module.exports = api;