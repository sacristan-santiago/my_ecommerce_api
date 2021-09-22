var admin = require("firebase-admin");

interface addProduct {
    uID: number,
    timestamp: Date,
    nombre: string,
    descripcion: string,
    codigo: string,
    foto: string,
    stock: number,
    precio: number,
}

export class ProductosFIREBASEDAO {

    async get (id: string | undefined) {
        try {
            const firebaseDB = admin.firestore();

            if (id) {
                let resultado = await firebaseDB.collection("productos").doc(id).get();
                return ({
                    id: resultado.id,
                    data: resultado.data()
                })
            }

            let resultado = await firebaseDB.collection("productos").get();
            let docs = resultado.docs;

            const output = docs.map((aDoc:any) => ({
                id: aDoc.id,
                data: aDoc.data()
            }));
    
            return output;                
        } catch (err) {
            console.log("ERROR");
            console.log(err);
        }
    }

    async add(data: addProduct) {
        try{
            const firebaseDB = admin.firestore();
            const UserDocument = firebaseDB.collection("productos").doc();
            await UserDocument.create(data)      //vamos a crear un documento cuya key sea (algo generico)
                                                //a ese documento le metemos data en formato json
            console.log("Se creo un nuevo documento!")        
        }
        catch(err){
            console.log("ERROR");
            console.log(err);
        }
    }

    async update(id: string, data: addProduct) {
        try{
            const firebaseDB = admin.firestore();
            const UserDocument = firebaseDB.collection("productos").doc(id);
            await UserDocument.update(data)      //vamos a crear un documento cuya key sea (algo generico)
                                                //a ese documento le metemos data en formato json
            console.log("Se actualizo un documento!")
            return this.get(id)     
        }
        catch(err){
            console.log("ERROR");
            console.log(err);
        }
    }

    async delete(id: string) {
        try{
            const firebaseDB = admin.firestore();
            const deletedDocument = await this.get(id);
            const UserDocument = firebaseDB.collection("productos").doc(id);
            await UserDocument.delete()      //vamos a crear un documento cuya key sea (algo generico)
                                                //a ese documento le metemos data en formato json
            console.log("Se elimino un documento!")
            return deletedDocument;     
        }
        catch(err){
            console.log("ERROR");
            console.log(err);
        }
    }
}