import { myMariaDB } from "../services/db";

interface addProduct {
    nombre: string,
    descripcion: string,
    codigo: string,
    foto: string,
    stock: number,
    precio: number,
}

class ProductosPersistencia {
    async getAll () {
        return myMariaDB.from("productos").select();
    }

    async get (id: number) {
        return myMariaDB.from("productos").where({id: id}).select()
    }


    async add(data: addProduct) {
        return myMariaDB.from("productos").insert(data);
    }

    async update(id: number, data: addProduct) {
        await myMariaDB.from("productos").where({id: id}).update(data)
        //returning updated product
        return myMariaDB.from("productos").where({id: id}).select()
    }

    async delete(id: number) {
        const deleted = await myMariaDB.from("productos").where({id: id}).select()
        await myMariaDB.from("productos").where({id: id}).del();
        //returning deleted product
        return deleted;
    }
}

export const ProductoPersistencia = new ProductosPersistencia;