const User = require('../models/user');

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


//Exportar paquete de funciones
module.exports = {
    registerUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser

}