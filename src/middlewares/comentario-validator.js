import { body, param } from "express-validator"
import { validarCampos } from "./validar-campos.js"
import { handleErrors } from "./handle-errors.js"
import { comentarioExists } from "../helpers/db-validators.js"

export const createComentarioValidator = [
    body("opiniones").notEmpty().withMessage("La opinion es requerida"),
    body("informacion").notEmpty().withMessage("La informacion es necesaria"),
    validarCampos,
    handleErrors
]

export const updateComentarioValidator = [
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(comentarioExists),  
    validarCampos,
    handleErrors
]

export const deleteComentarioValidator = [
    param("id").isMongoId().withMessage("No es un ID válido"),
    param("id").custom(comentarioExists),
    validarCampos,
    handleErrors
]