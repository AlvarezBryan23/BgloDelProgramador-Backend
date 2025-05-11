import { Schema, model} from "mongoose";

const publicacionesSchema = Schema({
    titulo:{
        type:String,
        required: [true, "El titulo es obligatorio"],
        maxLength: [25, "El titulo no puede exceder 25 caracteres"]
    },
    categoria: {
        type:String,
        required: true,
        enum: ["TALLER", "TECNOLOGIA", "TICS"]
    },
    textoPrincipal: {
        type: String,
        required: [true, "El texto principal es obligatorio"],
        maxLength: [300, "El texto principal no puede exceder 100 caracteres"]
    },
    entryDate: { 
        type: Date, default: Date.now 
    },
    role:{
        type:String,
        required: true,
        enum: ["AUTOR_ROLE"],
        default: "AUTOR_ROLE"
    },
    usuario:{
        type: String,
        ref: 'user',
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Publicaciones", publicacionesSchema)