import mongoose from "mongoose";

const usersCollection = "users";

const UsersSchema = new mongoose.Schema ({
    uID: {type: String, required: true},
    username: {type: String, require: true, max: 35},
    room: {type: String, require: true, max: 20},
    messages: {type: Array}
})

export const usersmodel = mongoose.model(usersCollection, UsersSchema)