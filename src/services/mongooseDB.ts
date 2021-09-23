import mongoose from "mongoose";
import {productosmodel} from "../schemas/productos";
import  {countersmodel} from "../schemas/counters";
import Config from "../config"

class mongoooseDB {
    async init () {
        try {
            const dbName = Config.MONGO_LOCAL_DBNAME;
            const URL = `mongodb://localhost/${dbName}`;
            
            /******************PRODUCTOS DB******************/    
            const products = [
                {
                    uID: 1,
                    timestamp: new Date,
                    nombre: "PRODUCTO 1",
                    descripcion: "descripcion 1",
                    codigo: "ASD123",
                    foto: "URL1",
                    precio: 10.23,
                    stock: 10
                },
                {
                    uID: 2,
                    timestamp: new Date,
                    nombre: "PRODUCTO 2",
                    descripcion: "descripcion 2",
                    codigo: "ASD234",
                    foto: "URL2",
                    precio: 10.23,
                    stock: 10
                },
                {
                    uID: 3,
                    timestamp: new Date,
                    nombre: "PRODUCTO 3",
                    descripcion: "descripcion 3",
                    codigo: "ASD345",
                    foto: "URL3",
                    precio: 10.23,
                    stock: 10
                },
                {
                    uID: 4,
                    timestamp: new Date,
                    nombre: "PRODUCTO 4",
                    descripcion: "descripcion 4",
                    codigo: "ASD456",
                    foto: "URL4",
                    precio: 10.23,
                    stock: 10
                }
              ]

            await mongoose.connect(URL);
            
            // await productosmodel.collection.drop();
            // await countersmodel.collection.drop();

            //Create collection
            if (!(await productosmodel.exists({}))) {
                await productosmodel.insertMany(products);
                const productosCounter = {
                    _id: "productos counter identifier",
                    count: 4,
                    notes: "Increment COUNT using findAndModify to ensure that the COUNT field will be incremented atomically with the fetch of this document",
                }
                await new countersmodel(productosCounter).save();
            }

        } catch (e) {
          console.log("Error: ", e);
        }
    }
}

export const mongooseService = new mongoooseDB;

