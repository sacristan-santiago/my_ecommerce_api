import mongoose from "mongoose";
import Joi from "joi"

const usersCollection = "users";
const PASS_RE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const UsersSchema = new mongoose.Schema ({
    uID: {type: String, required: true},
    username: {type: String, require: true, max: 35},
    room: {type: String, require: true, max: 20},
    messages: {type: Array}
})

export const userJoiSchema = Joi.object({
    firstName: Joi.string().min(4).max(15).required(),
    lastName: Joi.string().min(4).max(15).required(),
    email: Joi.string().email().required(),
    username: Joi.string().min(5).max(10).required(),
    password: Joi.string().regex(PASS_RE).required(),
    password2: Joi.string().regex(PASS_RE).required(),
    phoneNumber: Joi.string().min(14).max(15).required()
})

export const usersmodel = mongoose.model(usersCollection, UsersSchema)