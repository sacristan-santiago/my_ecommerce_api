import {sqliteDB} from "../../../services/mysqlDB"

interface addProduct {
    nombre: string,
    descripcion: string,
    codigo: string,
    foto: string,
    stock: number,
    precio: number,
}

export class ProductosSQLITE3DAO {
    async get (_id: string | undefined) {
        const id: number  = Number(_id)
        if (id) {
            return sqliteDB.from("productos").where({id: id}).select()
        }
        return sqliteDB.from("productos").select();
    }

    async add(data: addProduct) {
        return sqliteDB.from("productos").insert(data);
    }

    async update(_id: string, data: addProduct) {
        const id: number  = Number(_id)
        await sqliteDB.from("productos").where({id: id}).update(data)
        //returning updated product
        return sqliteDB.from("productos").where({id: id}).select()
    }

    async delete(_id: string) {
        const id: number  = Number(_id)
        const deleted = await sqliteDB.from("productos").where({id: id}).select()
        await sqliteDB.from("productos").where({id: id}).del();
        //returning deleted product
        return deleted;
    }
}