import { Router } from "express";
import { createComentarioValidator, deleteComentarioValidator, updateComentarioValidator } from "../middlewares/comentario-validator.js";
import { deleteComentarios, ListarComentarios, saveComentarios, updateComentarios} from "../comentarios/comentario.controller.js"

const router = Router()

/**
 * @swagger
 * /addComentario:
 *   post:
 *     summary: Agrega un nuevo comentario.
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               opiniones:
 *                 type: string
 *                 description: Opinión del comentario.
 *               informacion:
 *                 type: string
 *                 description: Información adicional del comentario.
 *               titulo:
 *                 type: string
 *                 description: Título de la publicación asociada.
 *               username:
 *                 type: string
 *                 description: Nombre de usuario del autor.
 *     responses:
 *       200:
 *         description: Comentario agregado exitosamente.
 *       400:
 *         description: Publicación o usuario no encontrado.
 *       500:
 *         description: Error al guardar el comentario.
 */
router.post("/addComentario", createComentarioValidator, saveComentarios)

/**
 * @swagger
 * /listarComentarios:
 *   get:
 *     summary: Lista los comentarios activos.
 *     tags: [Comentarios]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número máximo de comentarios a listar.
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *         description: Índice desde donde empezar la lista.
 *     responses:
 *       200:
 *         description: Lista de comentarios obtenida exitosamente.
 *       500:
 *         description: Error al listar los comentarios.
 */
router.get("/listarComentarios", ListarComentarios)

/**
 * @swagger
 * /updateComentario/{id}:
 *   patch:
 *     summary: Actualiza un comentario por ID.
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               opiniones:
 *                 type: string
 *                 description: Opinión actualizada.
 *               informacion:
 *                 type: string
 *                 description: Información actualizada.
 *     responses:
 *       200:
 *         description: Comentario actualizado exitosamente.
 *       500:
 *         description: Error al actualizar el comentario.
 */
router.patch("/updateComentario/:id", updateComentarios, updateComentarioValidator)

/**
 * @swagger
 * /deleteComentario/{id}:
 *   delete:
 *     summary: Elimina un comentario por ID.
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario a eliminar.
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente.
 *       500:
 *         description: Error al eliminar el comentario.
 */
router.delete("/deleteComentario/:id", deleteComentarios, deleteComentarioValidator)

export default router;