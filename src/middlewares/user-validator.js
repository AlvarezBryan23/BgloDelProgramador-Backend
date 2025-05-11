import { body, param } from "express-validator";
import { userExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";
import { deleteFileOnError } from "./delete-file-on-errors.js";
import { handleErrors } from "./handle-errors.js"

export const updateUserValidator = [
    param("uid", "El ID no es válido").isMongoId(),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

export const updateProfilePictureValidator = [
    param("uid").isMongoId().withMessage("No es un ID válida"),
    param("uid").custom(userExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
]
export const updatePasswordValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(userExists),
    body("newPassword").isLength({min: 8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]
