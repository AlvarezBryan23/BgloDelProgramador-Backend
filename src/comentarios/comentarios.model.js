import { Schema, model} from "mongoose";

const comentarioSchema = Schema({
    opiniones:{
        type:String,
        required: [true, "La opinion es requerida"],
        maxLength: [300, "La opinion no puede pasar los caracteres"]
    },
    informacion:{
        type:String,
        required: [true, "La informacion es requerida"],
        maxLength: [300, "La informacion no puede ir vacía"]
    },
    entryDate: { 
        type: Date, default: Date.now 
    },
    role:{
        type: String,
        required: true,
        enum: ["AUTOR_ROLE"],
        default: "AUTOR_ROLE"
    },
    publicacion: {
        type: String,
        ref: 'publicaciones',
        required: true
    },
    usuario:{
        type: String,
        ref: 'user',
        required: true
    },
    status:{
        type:Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Comentarios", comentarioSchema)