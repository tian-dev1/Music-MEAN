/* Contiene la configuración del servidor con su framework express */
const express = require('express');
const app = express();

//Declaración de cors 

//variable de rutas a ejecutar
const userRouter = require('./routes/userRouter');


// -- Middlewares -- (fragmento de codigo que se ejecuta entre la petición y la respuesta)
app.use(express.json());

// Consumo de las rutas 
app.use('/api',userRouter);


// -- Fin Middlewares --

// Exportación del módulo
module.exports = app;