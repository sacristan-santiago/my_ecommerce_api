import mongoose from "mongoose";

const messageCollection = "message";

const MessageSchema = new mongoose.Schema ({
    author: {
        email: { type: String, required: true, max: 50 },
        nombre: { type: String, required: true, max: 50 },
        apellido: { type: String, required: true, max: 50 },
        alias: { type: String, required: true, max: 50 },
        edad: { type: Number, required: true },
        avatar: { type: String, required: true, max: 50 },
      },
    text: { type: String, required: true, max: 1000 },
    time: { type: String, required: true, max: 50 },
})

export const messagemodel = mongoose.model(messageCollection, MessageSchema)