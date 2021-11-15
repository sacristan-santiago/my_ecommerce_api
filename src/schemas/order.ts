import mongoose, { Schema } from "mongoose";

const ordersCollection = "orders";

export const OrderSchema = new mongoose.Schema ({
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

export const ordermodel = mongoose.model(ordersCollection, OrderSchema)