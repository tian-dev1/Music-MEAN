const mongoose = require('mongoose');

const Schema = mongoose.Schema;


var UserSchema = new Schema({
    names: String,
    lastNames: String,
    email: String,
    pass: String,
    rol: String,
    image: String

    //fecha: Date,
    //telefono: Number
});


//Exportar el modelo
module.exports = mongoose.model('Users', UserSchema);