import mongoose from "mongoose";
import Grid from "gridfs-stream";
import {productosmodel} from "../schemas/productos";
import {countersmodel} from "../schemas/counters";
import Config from "../config";

const usuario = Config.MONGO_ATLAS_USER;
const password = Config.MONGO_ATLAS_PASSWORD;
const dbName = Config.MONGO_ATLAS_DBNAME;
const clusterUrl = Config.MONGO_ATLAS_CLUSTER
export const myURI = `mongodb+srv://${usuario}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority`

class atlasDB {
    async init () {
        try {

            // const connectionParams = {
            //     useNewUrlParser: true,
            //     useCreateIndex: true,
            //     useUnifiedTopology: true
            // }
                        
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

            await mongoose.connect(myURI);

            let gfs;
            const conn = mongoose.connection
            conn.once("open", ()=> {
                gfs = Grid(conn, mongoose.mongo)
                gfs.collection("photos")
            })
            
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

export const altasService = new atlasDB;

