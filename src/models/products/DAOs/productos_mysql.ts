import {myMariaDB} from "../../../services/mysqlDB"

interface addProduct {
    nombre: string,
    descripcion: string,
    codigo: string,
    foto: string,
    stock: number,
    precio: number,
}

export class ProductosMYSQLDAO {
    async get (_id: string | undefined) {
        const id: number  = Number(_id)
        if (id) {
            return myMariaDB.from("productos").where({id: id}).select()
        }
        return myMariaDB.from("productos").select();
    }

    async add(data: addProduct) {
        return myMariaDB.from("productos").insert(data);
    }

    async update(_id: string, data: addProduct) {
        const id: number  = Number(_id)
        await myMariaDB.from("productos").where({id: id}).update(data)
        //returning updated product
        return myMariaDB.from("productos").where({id: id}).select()
    }

    async delete(_id: string) {
        const id: number  = Number(_id)
        const deleted = await myMariaDB.from("productos").where({id: id}).select()
        await myMariaDB.from("productos").where({id: id}).del();
        //returning deleted product
        return deleted;
    }
}