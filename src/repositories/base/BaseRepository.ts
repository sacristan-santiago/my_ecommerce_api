import { IWrite } from "../interface/write-interface";
import { IRead } from "../interface/read-interface";
import mongoose from "mongoose";
import {productosmodel} from "../../schemas/productos";
import { ParticipantConversationList } from "twilio/lib/rest/conversations/v1/participantConversation";


//this class can only be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
    public readonly collectionmodel: mongoose.Model<unknown, {}, {}>

    constructor(collectionmodel: mongoose.Model<unknown, {}, {}>) {
        this.collectionmodel = collectionmodel
    }

    async get (id: string | undefined) {
        console.log("entro al get")

        if (id) {
            return this.collectionmodel.find({_Id : id})
        }

        console.log("paso de este lado")
        const result = productosmodel.find({});
        console.log(result)
        return result
    }

    async add(item: T): Promise<boolean> {
        const result = await this.collectionmodel.insertMany([item])

        return (result) ? true : false 
    }
        
    async update(id: string, item: T): Promise<boolean> {
        const result = await this.collectionmodel.findOneAndUpdate({_id: id}, item)
        
        return (result) ? true : false 
    }
    
    async delete(id: string): Promise<boolean> {
        const result = await this.collectionmodel.deleteOne({_id: id});

        return (result) ? true : false 
    }

}