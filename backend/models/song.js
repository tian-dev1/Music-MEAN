const mongoose = require('mongoose');

const Schema = mongoose.Schema;


var SongSchema = new Schema({
    title: String,
    duration: String,
    genre: String,
    imagen: String,
    artists: [],
    albumName: String,
    year: Number,
    
});


//Exportar el modelo
module.exports = mongoose.model('Songs', SongSchema);