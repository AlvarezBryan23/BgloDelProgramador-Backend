import { Router } from "express";
import { updateUser, updateProfilePictureU, updatePassword } from "./user.controller.js";
import { updateUserValidator, updateProfilePictureValidator, updatePasswordValidator } from "../middlewares/user-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-upload.js";

const router = Router();

/**
 * @swagger
 * /updateUser/{uid}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update user details.
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       500:
 *         description: Error updating user.
 */
router.patch("/updateUser/:uid", updateUserValidator, updateUser);

/**
 * @swagger
 * /updateProfilePicture/{uid}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update user profile picture.
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated successfully.
 *       400:
 *         description: No file found in the request.
 *       500:
 *         description: Error updating profile picture.
 */
router.patch("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePictureU);

/**
 * @swagger
 * /updatePassword/{uid}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update user password.
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       400:
 *         description: Incorrect old password or new password matches the old one.
 *       500:
 *         description: Error updating password.
 */
router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword);

export default router;