import mongoose from "mongoose";
import {ProductoSchema} from "../schemas/productos";

const carritoCollection = "carrito";

const CarritoSchema = new mongoose.Schema ({
    uID: {type: Number, required: true},
    timestamp: {type: Date, required: true},
    productos: [ProductoSchema],
})

export const carritomodel = mongoose.model(carritoCollection, CarritoSchema)