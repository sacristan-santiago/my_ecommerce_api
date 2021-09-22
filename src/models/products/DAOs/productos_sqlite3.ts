import {sqliteDB} from "../../../services/mysqlDB";
import {ProductQuery, Product} from "../products.interface";

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

    async query(options: ProductQuery) {
        try {
            let productos = await sqliteDB.from("productos").select();

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