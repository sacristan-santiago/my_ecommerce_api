import mongoose from "mongoose";

const countersCollection = "counters";

const CounterSchema = new mongoose.Schema ({
    _id: {type: String, required: true},
    count: {type: Number, required: true},
    notes: {type: String, required: true},

})

export const countersmodel = mongoose.model(countersCollection, CounterSchema)