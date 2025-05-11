"use strict"
import Comentarios from "../comentarios/comentarios.model.js"
import Publicacion from "../publicaciones/publicaciones.models.js"
import User from "../user/user.model.js"

export const saveComentarios = async(req, res) =>{
    try{
        const data = req.body;
        const publicacion = await Publicacion.findOne({ titulo: data.titulo });
        const user = await User.findOne({username: data.username})

        
        if(!publicacion){
            return res.status(400).json({
                success: false,
                message: "Publicacion no encontrada"
            });
        }

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        const comentarios = new Comentarios({
            ...data,
            publicacion: publicacion.titulo,
            usuario: user.username
        });

        await comentarios.save();

        res.status(200).json({
            success: true,
            comentarios
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al guardar el comentario",
            error: err.message
        })
    }
};

export const updateComentarios = async(req, res) => {
    try{
        const { id } = req.params;
        const data = req.body;

        const comentario = await Comentarios.findByIdAndUpdate(id, data, {new: true})

        res.status(200).json({
            success: true,
            message: "Tu comentario se actualizo",
            comentario
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al actualizar el comentario",
            error: err.message
        })
    }
}

export const deleteComentarios = async(req, res) => {
    try{
        const { id } = req.params;

        await Comentarios.findByIdAndDelete(id, {status: false}, {new: true})

        res.status(200).json({
            success: true,
            message: "Comentario eliminado",
            Comentarios
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la publicación',
            err
        })
    }
}

export const ListarComentarios = async(req, res) => {
    try{
        const { limit = 10, from = 0 } = req.query;
        const query = { status: true }; // Filtramos comentarios activos
        const comentarios = await Comentarios.find(query)

            .sort({ entryDate: 1 }) 
            .skip(Number(from))     
            .limit(Number(limit)); 

        const total = await Comentarios.countDocuments(query); 

        return res.status(200).json({
            success: true,
            total,
            comentarios
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al listar los comentarios',
            err
        })
    }
}
