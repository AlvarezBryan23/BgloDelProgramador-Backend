"use strict"
import express from 'express'
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from './mongo.js'
import userRoutes from "../src/user/user.route.js"
import publicacionRoutes from "../src/publicaciones/publicaciones.routes.js"
import comentarioRoutes from "../src/comentarios/comentario.routes.js"
import apiLimiter from '../src/middlewares/validar-cant-peticiones.js'
import { AddUserAdmin } from '../src/user/user.controller.js'
import { swaggerDocs, swaggerUi } from './swagger.js'

const middlewares = (app) =>{
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())
    app.use(cors({
        origin: '*', // Permitir todas las solicitudes de origen
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
                connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
                imgSrc: ["'self'", "data:"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            },
        },
    }));
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) =>{
    app.use("/blogProgramador/v1/user", userRoutes)
    app.use("/blogProgramador/v1/publicaciones", publicacionRoutes)
    app.use("/blogProgramador/v1/comentario", comentarioRoutes)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
    }
}

export const initServer = () =>{
    const app = express()
    try{
        middlewares(app)
        routes(app)
        conectarDB()
        AddUserAdmin();
        app.listen(process.env.PORT)
        console.log(`Server running on port: ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}