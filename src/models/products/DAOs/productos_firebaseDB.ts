var admin = require("firebase-admin");
import {ProductQuery, Product} from "../products.interface";
import {dataOrdered} from "../../../utils/productos"

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

    async get (_id: string | undefined) {
        try {
            const firebaseDB = admin.firestore();

            if (_id) {
                let resultado = await firebaseDB.collection("productos").doc(_id).get();
                if(resultado.exists) {
                    const data: any = resultado.data();
                    data.id = resultado.id;
                    return dataOrdered(data);
                }
                return ;
            }

            let resultado = await firebaseDB.collection("productos").get();
            let docs = resultado.docs;

            const output = docs.map((aDoc:any) => {
                const data = aDoc.data();
                data.id = aDoc.id;
                return dataOrdered(data);
            });
    
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
    async query(options: ProductQuery) {
        try {
            const firebaseDB = admin.firestore();
            let data = await firebaseDB.collection("productos").get();
            let docs = data.docs;
           
            let productos = docs.map((aDoc:any) => {
                const data = aDoc.data();
                data.id = aDoc.id;
                return dataOrdered(data);
            });

            type Conditions = (aProduct: Product) => boolean;
            const query: Conditions[] = [];
            
            if (options.nombre)
              query.push((aProduct: Product) => aProduct.nombre == options.nombre);
        
            if (options.codigo)
              query.push((aProduct: Product) => aProduct.codigo == options.codigo);

            if (options.precioMin) {
                query.push((aProduct: Product) => aProduct.precio >= Number(options.precioMin));
            }

            if (options.precioMax) {
                query.push((aProduct: Product) => aProduct.precio <= Number(options.precioMax));
            }

            if (options.stockMin) {
                query.push((aProduct: Product) => aProduct.stock >= Number(options.stockMin));
            }

            if (options.stockMax) {
                query.push((aProduct: Product) => aProduct.stock <= Number(options.stockMax));
            }
              
            return productos.filter((aProduct: Product) => query.every((x) => x(aProduct)));
        
        } catch (err) {
            console.log("ERROR");
            console.log(err);
        }
    }
}