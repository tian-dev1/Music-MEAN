const User = require('../models/user');

// Importar modulo File System 
const fs = require('fs');
// Importar modulo path
const path = require('path');

//Función de registrar usuario
function registerUser(req, res){
    var user = new User();
    var parameters = req.body;

    user.names = parameters.names;
    user.lastNames = parameters.lastNames;
    user.email = parameters.email;
    user.pass = parameters.pass;
    user.rol = 'usuario'; //Dato rol quemado - usuario por defecto
    user.image = null;

    //Función save() para interactuar con la DB
    user.save((err, userNew)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!userNew){
                res.status(200).send({message: "No fue posible realizar el registro"})
            }else{
                res.status(200).send({
                    message: "Usuario creado",
                    user: userNew
                });
            }
        }
    });

}

//Función de mostrar todos los usuarios
function getAllUsers(req, res){
    User.find((err, usersFound)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!usersFound){
                res.status(200).send({message:"No fue posible encontrar el usuario"});
            }else{
                res.status(200).send({
                    message: "Usuarios encontrados",
                    users: usersFound
                });
            }
        }
    });

}

//Función de mostrar usuario en especifico
function getUser(req, res){
    var userId = req.params.id;
    User.findById(userId, (err, userFound)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!userFound){
                res.status(200).send({message:"No fue posible encontrar el usuario"});
            }else{
                res.status(200).send({
                    message: "Usuario encontrado",
                    users: userFound
                });
            }
        }
    });

}

//Función de actualizar usuario
function updateUser(req, res){ 
    var userId = req.params.id;
    var newUserData = req.body;

    User.findByIdAndUpdate(userId, newUserData, (err, updatedUser)=>{
        if(err){
            res.status(200).send({message:"Error en el servidor"});
        }else{
            if(!updatedUser){
                res.status(200).send({message:"No fue posible actualizar el usuario"});
            }else{
                res.status(200).send({
                    message:"Usuario actualizado",
                    user: updatedUser
                });
            }
        }
    });
}

//Función de eliminar usuario
function deleteUser(req, res){
    var userId = req.params.id; 
    
    User.findByIdAndDelete(userId, (err, deletedUser)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!deletedUser){
                res.status(200).send({message:"No fue posible eliminar el usuario"});
            }else{
                res.status(200).send({
                    message:"Usuario eliminado",
                    user: deletedUser
                });
            }
        }
    });
}


function login(req, res){
    var parametros = req.body;
    var emailUser = parametros.email;
    var passUser = parametros.pass;

    User.findOne({ email: emailUser }, (err, userLogin) =>{
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        } else {
            if (!userLogin) {
                res.status(200).send({ message: "Usuario inexistente" });
            } else {
                if (userLogin.pass != passUser) {
                    res.status(200).send({ message: "Contraseña incorrecta" });
                } else {
                    res.status(200).send({
                        message: "Usuario logueado de manera exitosa",
                        user: userLogin
                    });
                }
            }
        }
    });


}

function uploadImage(req, res){
    var usuarioId = req.params.id;
    var nombreArchivo = "No has subido ninguna imagen...";

    //Validar si efectivamente se esta enviando un archivo

    if (req.files) {
        // Vamos a ir analizando la ruta del archivo, el nombre y la extención
        // C:\\usuarios\descargas\imagen.png
        var rutaArchivo = req.files.image.path ;
        console.log(`Ruta archivo: ${rutaArchivo}`);

        // Haremos un split para separar elementos
        // Esto nos generará un arreglo de datos
        var partirArchivo = rutaArchivo.split('\\');
        console.log(`partir archivo: ${partirArchivo}`);

        //Acceder a la posicion que contiene el nombre del archivo
        var nombreArchivo = partirArchivo[2];
        console.log(`Posición dato: ${nombreArchivo}`);

        //Haremos un split para separar el nombre del archivo de la extencion
        //['imagen','png']
        var extensionImg = nombreArchivo.split('\.');
        console.log(`partir imagen: ${extensionImg}`);

        //Accedemos a la pocision de la extencion de l archivo
        var extensionArchivo = extensionImg[1];
        console.log(`Extension archivo: ${extensionArchivo}`);

        // Validar si el formato del archivo es aceptable 

        if(extensionArchivo == 'png'||extensionArchivo=='jpg'||extensionArchivo=='jpeg'){
            //Actulizar del usuario el campo imagen

            User.findByIdAndUpdate(usuarioId,{image:nombreArchivo},(err,usuarioConImg)=>{
                if(err){
                    res.status(500).send({message: "Error en el servidor"});
                }else{
                    if(!usuarioConImg){
                        res.status(200).send({message: "No fue posible subir la imagen"});
                    }else{
                        res.status(200).send({
                            message: "Imagen anexada!",
                            imagen: nombreArchivo,
                            usuario: usuarioConImg
                        })
                    }
                }
            });
        }else{
            res.status(200).send({message:"Formato invalido! El archivo no es una imagen"})
        }
    } else {
        res.status(200).send({ message: "No has subido imagen" });
    }
}

function getImage(req, res){

}


//Exportar paquete de funciones
module.exports = {
    registerUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    login,
    uploadImage,
    getImage

}