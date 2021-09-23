var admin = require("firebase-admin");
var serviceAccount = require("./firebase.json");
import Config from "../config";

class firebaseDB {
    async init() {
        admin.initializeApp({
            credential: admin.credential.cert({
                privateKey: Config.FIREBASE_PRIVATEKEY,
                projectId: Config.FIREBASE_PROJECTID,
                clientEmail: Config.FIREBASE_CLIENTEMAIL
            })
        });
          
        const firebaseDB = admin.firestore();
        const productsCollection = await firebaseDB.collection("productos").get()
        if ((productsCollection.empty)) {
            const products = [
                {
                    timestamp: new Date,
                    nombre: "PRODUCTO 1",
                    descripcion: "descripcion 1",
                    codigo: "ASD123",
                    foto: "URL1",
                    precio: 10.23,
                    stock: 10
                },
                {
                    timestamp: new Date,
                    nombre: "PRODUCTO 2",
                    descripcion: "descripcion 2",
                    codigo: "ASD234",
                    foto: "URL2",
                    precio: 10.23,
                    stock: 10
                },
                {
                    timestamp: new Date,
                    nombre: "PRODUCTO 3",
                    descripcion: "descripcion 3",
                    codigo: "ASD345",
                    foto: "URL3",
                    precio: 10.23,
                    stock: 10
                },
                {
                    timestamp: new Date,
                    nombre: "PRODUCTO 4",
                    descripcion: "descripcion 4",
                    codigo: "ASD456",
                    foto: "URL4",
                    precio: 10.23,
                    stock: 10
                }
            ]
            
            //Agrego varios documentos al mismo tiempo
            const batch = firebaseDB.batch();
            products.forEach((doc) =>{
                const docRef = firebaseDB.collection("productos").doc();
                batch.set(docRef, doc)
            })
            batch.commit();
            console.log("se crea firebase collection productos!")
        }
    }
}

export const firebaseService = new firebaseDB;
