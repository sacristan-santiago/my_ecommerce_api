import { BaseRepository } from "../../../repositories/base/BaseRepository";
import { Product } from "../../../entities/product";
import {ProductQuery, MongoProduct} from "../products.interface";
import mongoose from "mongoose"

export class ProductosALTASMONGODAO_EXTENDED extends BaseRepository<Product> {
    private static instance: ProductosALTASMONGODAO_EXTENDED

    private constructor(collectionmodel: mongoose.Model<unknown, {}, {}>) {
        super(collectionmodel);
    }

    public static getInstance(collectionmodel: mongoose.Model<unknown, {}, {}>): ProductosALTASMONGODAO_EXTENDED {
        if (!ProductosALTASMONGODAO_EXTENDED.instance) {
            ProductosALTASMONGODAO_EXTENDED.instance = new ProductosALTASMONGODAO_EXTENDED(collectionmodel)
        }
        
        return ProductosALTASMONGODAO_EXTENDED.instance
    }
    
    async query(options: ProductQuery) {
        let productos = await this.collectionmodel.find({});

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
    }
}