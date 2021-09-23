import {myMariaDB} from "../../../services/mysqlDB";
import {Product} from "../../products/products.interface"


export class CarritoMYSQLDAO {

    async findProduct (id: string | undefined = undefined) {
        return myMariaDB.from("carrito").where({id: id}).select()
    }
    
    async getProducts (id: string | undefined = undefined) {
        if (id) {
            const output = await myMariaDB.from("carrito").where({id: id}).select();
            if (output[0]) {return output}
            return;
        }

        return myMariaDB.from("carrito").select();
    }
    
    async addProduct (newItem: Product[]){
            await myMariaDB.from("carrito").insert(newItem);
            return newItem;
    }

    async deleteProduct(_id: string) {
        const id: number  = Number(_id)
        const deleted = await myMariaDB.from("carrito").where({id: id}).select()
        await myMariaDB.from("carrito").where({id: id}).del();
        //returning deleted product
        return deleted;
    }
}