import {productosmodel} from "../../../schemas/productos";
import {countersmodel} from "../../../schemas/counters";
import {ProductQuery, MongoProduct} from "../products.interface";

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

export class ProductosLOCALMONGODAO {
    
    async get (id: number | undefined) {
        if (id) {
            return productosmodel.find({uID: id})
        }
        return productosmodel.find({});
        
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
    
    async query(options: ProductQuery) {
        try {
            let productos = await productosmodel.find({});

            type Conditions = (aProduct: MongoProduct) => boolean;
            const query: Conditions[] = [];
            
            if (options.nombre)
              query.push((aProduct: MongoProduct) => aProduct.nombre == options.nombre);
        
            if (options.codigo)
              query.push((aProduct: MongoProduct) => aProduct.codigo == options.codigo);

            if (options.precioMin) {
                query.push((aProduct: MongoProduct) => aProduct.precio >= Number(options.precioMin));
            }

            if (options.precioMax) {
                query.push((aProduct: MongoProduct) => aProduct.precio <= Number(options.precioMax));
            }

            if (options.stockMin) {
                query.push((aProduct: MongoProduct) => aProduct.stock >= Number(options.stockMin));
            }

            if (options.stockMax) {
                query.push((aProduct: MongoProduct) => aProduct.stock <= Number(options.stockMax));
            }
              
            return productos.filter((aProduct: any) => query.every((x) => x(aProduct)));
        
        } catch (err) {
            console.log("ERROR");
            console.log(err);
        }
    } 
}