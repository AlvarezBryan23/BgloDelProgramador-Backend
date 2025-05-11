"use strict"

import Publicacion from "../publicaciones/publicaciones.models.js";
import User from "../user/user.model.js";

export const savePublicaciones = async (req, res) => {
      try {
        const data = req.body;
        
        // Verificar si el username existe en la base de datos
        const user = await User.findOne({ username: data.username });  // Buscar por username

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'Usuario no encontrado'  // Cambié el mensaje para reflejar mejor la situación
            });
        }

        // Crear una nueva publicación con el username del usuario
        const publicacion = new Publicacion({
            ...data,
            usuario: user.username,  // Guardar el username del usuario
        });

        // Guardar la publicación en la base de datos
        await publicacion.save();

        // Responder con éxito y la publicación guardada
        res.status(200).json({
            success: true,
            publicacion
        });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({
            success: false,
            message: 'Error al guardar la Publicación',
            error: error.message
        });
    }
};


export const updatePublicaciones = async(req, res) =>{
    try{
        const { id } = req.params;
        const data = req.body;

        const publicacion = await Publicacion.findByIdAndUpdate(id, data, {new: true})

        res.status(200).json({
            success: true,
            message: "Tu publicación se actualizo",
            publicacion,
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al actualizar tu publicación",
            error: err.message
        })
    }
}

export const deletePublicacion = async(req, res) =>{
    try{
        const { id } = req.params;

        await Publicacion.findByIdAndDelete(id, {status: false})

        res.status(200).json({
            success: true,
            message: "Publicación eliminada"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la publicación',
            err
        })
    }
}

export const getListarPublicacion = async (req, res) => {
     try {
    const { limit = 10, from = 0, listarOrden } = req.query; 

    const query = { status: true };

    const categorias = ['tics', 'tecnologia', 'taller'];
    if (categorias.includes(listarOrden?.toLowerCase())) {
      query.categoria = listarOrden.toUpperCase(); 
    }

    const ordenOptions = { createdAt: -1 };

    const [total, publicaciones] = await Promise.all([
      Publicacion.countDocuments(query),
      Publicacion.find(query)
        .sort(ordenOptions)
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    return res.status(200).json({
      success: true,
      total,
      publicaciones
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al listar las publicaciones",
      error: err.message
    });
  }
};