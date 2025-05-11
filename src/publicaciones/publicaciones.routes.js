import { Router } from "express";
import { createPublicacionValidator, deletePublicacioneValidator, updatePublicacionValidator } from "../middlewares/publicaciones-validators.js";
import { deletePublicacion, getListarPublicacion, savePublicaciones, updatePublicaciones } from "./publicaciones.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

/**
 * @swagger
 * /addPublicacion:
 *   post:
 *     tags:
 *       - Publicaciones
 *     summary: Crea una nueva publicación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - categoria
 *               - textoPrincipal
 *               - username
 *             properties:
 *               titulo:
 *                 type: string
 *                 maxLength: 25
 *               categoria:
 *                 type: string
 *                 enum: ["TALLER", "TECNOLOGIA", "TICS"]
 *               textoPrincipal:
 *                 type: string
 *                 maxLength: 300
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publicación creada exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error al guardar la publicación.
 */
router.post("/addPublicacion", createPublicacionValidator, savePublicaciones);

/**
 * @swagger
 * /listarPublicacion:
 *   get:
 *     tags:
 *       - Publicaciones
 *     summary: Lista publicaciones con filtros opcionales.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número máximo de publicaciones a listar.
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Índice desde donde empezar a listar.
 *       - in: query
 *         name: listarOrden
 *         schema:
 *           type: string
 *           enum: ["tics", "tecnologia", "taller"]
 *         description: Filtrar por categoría.
 *     responses:
 *       200:
 *         description: Publicaciones listadas exitosamente.
 *       500:
 *         description: Error al listar las publicaciones.
 */
router.get("/listarPublicacion", getListarPublicacion);

/**
 * @swagger
 * /updatePublicacion/{id}:
 *   patch:
 *     tags:
 *       - Publicaciones
 *     summary: Actualiza una publicación existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la publicación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 maxLength: 25
 *               categoria:
 *                 type: string
 *                 enum: ["TALLER", "TECNOLOGIA", "TICS"]
 *               textoPrincipal:
 *                 type: string
 *                 maxLength: 300
 *     responses:
 *       200:
 *         description: Publicación actualizada exitosamente.
 *       500:
 *         description: Error al actualizar la publicación.
 */
router.patch("/updatePublicacion/:id", updatePublicacionValidator, updatePublicaciones);

/**
 * @swagger
 * /deletePublicacion/{id}:
 *   delete:
 *     tags:
 *       - Publicaciones
 *     summary: Elimina una publicación.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la publicación.
 *     responses:
 *       200:
 *         description: Publicación eliminada exitosamente.
 *       500:
 *         description: Error al eliminar la publicación.
 */
router.delete("/deletePublicacion/:id", deletePublicacioneValidator, deletePublicacion);

export default router;