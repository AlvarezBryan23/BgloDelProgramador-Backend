import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Blog de Programador API",
            version: "1.0.0",
            description: "API para un blog de programador",
            contact:{
                name: "Bryan Alvarez",
                email: "balvarez-2023244@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://localhost:3005/blogProgramador/v1"
            }
        ]
    },
    apis:[
        "./src/comentarios/*.js",
        "./src/publicaciones/*.js",
        "./src/user/*.js"
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export {swaggerDocs, swaggerUi}