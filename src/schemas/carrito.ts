import mongoose, { Schema } from "mongoose";

const carritoCollection = "carrito";

export const CarritoSchema = new mongoose.Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
      },
      products: [
        {
          _id: Schema.Types.ObjectId,
          amount: Number,
        },
      ],
})

export const carritomodel = mongoose.model(carritoCollection, CarritoSchema)