import {sqliteDB} from "../../../services/mysqlDB";
import {Product} from "../../products/products.interface"


export class CarritoSQLITE3DAO {

    async findProduct (id: string | undefined = undefined) {
        return sqliteDB.from("carrito").where({id: id}).select()
    }
    
    async getProducts (id: string | undefined = undefined) {
        if (id) {
            const output = await sqliteDB.from("carrito").where({id: id}).select();
            if (output[0]) {return output}
            return;
        }

        return sqliteDB.from("carrito").select();
    }
    
    async addProduct (newItem: Product[]){
            await sqliteDB.from("carrito").insert(newItem);
            return newItem;
    }

    async deleteProduct(_id: string) {
        const id: number  = Number(_id)
        const deleted = await sqliteDB.from("carrito").where({id: id}).select()
        await sqliteDB.from("carrito").where({id: id}).del();
        //returning deleted product
        return deleted;
    }
}