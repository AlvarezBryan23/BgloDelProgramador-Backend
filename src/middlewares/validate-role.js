export const hasRoles = (...roles) =>{
    return(req, res, next) =>{
        if(!req.usuario){
            return res.status(500).json({
                success: false,
                message: "Se require validar el role"
            })
        }

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                success: false,
                message: `Usuario no autorizado, Solo se permiten estos roles: ${roles}`
            })
        }
    }
}