const Song = require('../models/song');

//Función de registrar canción
function registerSong(req, res){
    var song = new Song();
    var parameters = req.body;

    song.title = parameters.title;
    song.duration = parameters.duration;
    song.genre = parameters.genre;
    song.image = null;
    song.artists = parameters.artists;
    song.albumName = parameters.albumName;
    song.year = parameters.year;

    //Función save() para interactuar con la DB
    song.save((err, songNew)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!songNew){
                res.status(200).send({message: "No fue posible realizar el registro"})
            }else{
                res.status(200).send({
                    message: "Canción creada",
                    song: songNew
                });
            }
        }
    });
}

//Función de mostrar todas las canciones
function getAllSongs(req, res){
    Song.find((err, songsFound)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!songsFound){
                res.status(200).send({message:"No fue posible encontrar la canción"});
            }else{
                res.status(200).send({
                    message: "Canciones encontradas",
                    songs: songsFound
                });
            }
        }
    });

}

//Función de mostrar canción en especifico
function getSong(req, res){
    var songId = req.params.id;
    Song.findById(songId, (err, songFound)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!songFound){
                res.status(200).send({message:"No fue posible encontrar la canción"});
            }else{
                res.status(200).send({
                    message: "Canción encontrada",
                    song: songFound
                });
            }
        }
    });

}

//Función de actualizar canción
function updateSong(req, res){ 
    var songId = req.params.id;
    var newSongData = req.body;

    Song.findByIdAndUpdate(songId, newSongData, (err, updatedSong)=>{
        if(err){
            res.status(200).send({message:"Error en el servidor"});
        }else{
            if(!updatedSong){
                res.status(200).send({message:"No fue posible actualizar la canción"});
            }else{
                res.status(200).send({
                    message:"Canción actualizada",
                    user: updatedSong
                });
            }
        }
    });
}

//Función de eliminar canción
function deleteSong(req, res){
    var songId = req.params.id; 
    
    Song.findByIdAndDelete(songId, (err, deletedSong)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!deletedSong){
                res.status(200).send({message:"No fue posible eliminar la canción"});
            }else{
                res.status(200).send({
                    message:"Canción eliminada",
                    user: deletedSong
                });
            }
        }
    });
}


//Exportar paquete de fuhnciones
module.exports = {
    registerSong,
    getAllSongs,
    getSong,
    updateSong,
    deleteSong

}