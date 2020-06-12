/* Contine toda a logica para conexion con DB y puerto del servidor */

const mongoose = require('mongoose');
const app = require('./app');

const port = 3000; // process.env.PORT

mongoose.connect('mongodb://localhost:27017/projectMEAN', (err, res)=>{
    //Validar conexion con mongo
    if(err){
        console.log(`El error es: ${err}`);
        
    }else{
        console.log(`Conexion con DB exitosa`);
        //app.set('port', process.env.PORT || 3000 ); -> Configuración de puerto del hosting
        //Generar servidor con su puerto
        app.listen(port, ()=>{
            console.log(`Puerto: ${port}`);
        });
    }
});