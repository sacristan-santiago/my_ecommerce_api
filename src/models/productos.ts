import mongoose from "mongoose";

const productosCollection = "productos";

const ProductoSchema = new mongoose.Schema ({
    uID: {type: Number, required: true},
    timestamp: {type: Date, required: true},
    nombre: {type: String, require: true, max: 100},
    descripcion: {type: String, require: true, max: 100},
    codigo: {type: String, require: true, max: 100},
    foto: {type: String, require: true, max: 100},
    precio: {type: Number, require: true},
    stock: {type: Number, require: true},
})

export const productosmodel = mongoose.model(productosCollection, ProductoSchema)