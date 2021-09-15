import {productosmodel} from "../models/productos";
import  {countersmodel} from "../models/counters";

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

class ProductosPersistencia {
    // id: number;

    async getAll() {
        return productosmodel.find({});
    }

    async get (id: number ) {
        return productosmodel.find({uID: id})
    }

    async add(data: addProduct) {
        const producto = data;
        producto.timestamp = new Date;
        //updateo id en base de datos
        await countersmodel.findByIdAndUpdate("productos counter identifier", {$inc: {count: 1}})
        const productscounter: any = await countersmodel.find({_id: "productos counter identifier" });
        producto.uID = productscounter[0].count;
        return productosmodel.insertMany([producto])
    }

    async update(id: number, data: addProduct) {
        const producto = data;
        producto.timestamp = new Date;
        producto.uID = id;

        await productosmodel.findOneAndUpdate({uID: id}, producto)
        //returning updated product
        return productosmodel.find({uID: id})
    }

    async delete(id: number) {
        const deleted = await productosmodel.find({uID: id});
        await productosmodel.deleteOne({uID: id});
        //returning deleted product
        return deleted;
    } 

}

export const ProductsPersistencia = new ProductosPersistencia;