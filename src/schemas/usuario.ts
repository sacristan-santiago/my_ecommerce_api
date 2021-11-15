import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserI } from "../models/usuarios/usuarios.interface";

export const UsuarioSchema = new mongoose.Schema<UserI> ({
    username:  {
        type: String,
        required: true,
        unique: true
    },
    email:  {
        type: String,
        required: true,
        unique: true
    },
    password:  {
        type: String,
        required: true,
    },
    firstName:  {
        type: String,
        required: true,
    },
    lastName:  {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },    
    photoId: {
        type: String,
        required: false,
    }
})

UsuarioSchema.pre("save", async function (next) {
    const user = this;

    const hash = await bcrypt.hash(user.password, 10);

    this.password = hash;

    next();
})

UsuarioSchema.methods.isValidPassword = async function (password){
    const user = this
    const compare = await bcrypt.compare(password, user.password)
    return compare;
}   

export const UsuarioModel = mongoose.model("usuario", UsuarioSchema)