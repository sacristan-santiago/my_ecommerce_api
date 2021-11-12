import mongoose from "mongoose";
import Grid from "gridfs-stream";
import {productosmodel} from "../schemas/productos";
import {countersmodel} from "../schemas/counters";
import {carritomodel} from "../schemas/carrito";
import {messagemodel} from "../schemas/message";
import Config from "../config"

class mongoooseDB {
    async init () {
        try {
            const dbName = Config.MONGO_LOCAL_DBNAME;
            const URL = `mongodb://localhost/${dbName}`;

            await mongoose.connect(URL);
            
            let gfs;
            const conn = mongoose.connection
            conn.once("open", ()=> {
                gfs = Grid(conn, mongoose.mongo)
                gfs.collection("uploads")
            })
            
            // await productosmodel.collection.drop();
            // await countersmodel.collection.drop();

            /******************PRODUCTOS COLLECTION******************/    
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

            //Create product collection
            if (!(await productosmodel.exists({}))) {
                await productosmodel.insertMany(products);
                const productosCounter = {
                    _id: "productos counter identifier",
                    count: 4,
                    notes: "Increment COUNT using findAndModify to ensure that the COUNT field will be incremented atomically with the fetch of this document",
                }
                await new countersmodel(productosCounter).save();
            }

            /******************CARRITO COLLECTION******************/    
            const carrito = {
                uID: 1,
                timestamp: new Date,
                productos: [
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
            }
                
            //Create carrito collection
            if (!(await carritomodel.exists({}))) {
                await carritomodel.insertMany(carrito);
                const carritoCounter = {
                    _id: "carrito counter identifier",
                    count: 1,
                    notes: "Increment COUNT using findAndModify to ensure that the COUNT field will be incremented atomically with the fetch of this document",
                }
                await new countersmodel(carritoCounter).save();
            }

            /******************MENSAJES COLLECTION******************/    
            const mensajes = [
                {
                    author: {
                        email: "tomael@gmail.com",
                        nombre: "Tomas",
                        apellido: "Him",
                        alias: "Tomael",
                        edad: 28,
                        avatar: "http//:tomaelpic",
                    },
                    text: "Hola chicos!",
                    time: "1:52 am",
                }
            ]
                
            //Create carrito collection
            if (!(await messagemodel.exists({}))) {
                await messagemodel.insertMany(mensajes);
                console.log("Creando mock de Mensajes")
            }


        } catch (e) {
          console.log("Error: ", e);
        }

    }
}

export const mongooseService = new mongoooseDB;

