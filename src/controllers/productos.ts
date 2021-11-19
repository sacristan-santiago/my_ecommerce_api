import {Request, Response, NextFunction} from "express";
import {ProductoPersistencia} from "../persistencia/productosMariaDB";
import {ProductsPersistencia} from "../persistencia/productosMongoose";
import {productsAPI} from "../apis/productos";
import {ProductQuery} from "../models/products/products.interface";


class Producto {
    async getProducts (req: Request, res: Response) {
        const {id} = req.params;
        const {nombre, codigo, precioMin, precioMax, stockMin, stockMax} = req.query;
        
        if (id) {
            const producto = await productsAPI.getProducts(id);
            if (!producto) {
                return res.status(404).json ({
                    msg: "Producto no encontrado",
                })
            }
            return res.status(200).json ({
                producto: await  productsAPI.getProducts(id)
            })
        }

        const query: ProductQuery = {};

        if (nombre) query.nombre = nombre.toString();
        if (codigo) query.codigo = codigo.toString();
        if (precioMin) query.precioMin = Number(precioMin);
        if (precioMax) query.precioMax = Number(precioMax);
        if (stockMin) query.stockMin = Number(stockMin);
        if (stockMax) query.stockMax = Number(stockMax);

        if (Object.keys(query).length) {
            return await productsAPI.query(query)
        };
        
        return res.status(200).json ({
            productos: await productsAPI.getProducts()
        })
    }

    checkProducts (req: Request, res: Response, next: NextFunction) {
        const {nombre, precio, descripcion, codigo, foto, stock} = req.body;

        if (!nombre || !precio || typeof nombre !== "string" || isNaN(precio) || !descripcion || !codigo || !foto || !stock) {
            return res.status(400).json({
                msg: "Campos del body invalidos",
            })
        }
        next(); 
    }
    
    async addProducts (req: Request, res: Response) {
        const newItem = await productsAPI.addProduct(req.body);

        return newItem
    }

    async updateProducts (req: Request, res: Response) {
        const id = req.params.id;
        const producto = await productsAPI.getProducts(id);

        if (!producto) {
            return res.status(404).json ({
                msg: "Producto no encontrado",
            })
        }

        res.json({
            msg: "producto actualizado",
            data: await productsAPI.updateProduct(id, req.body)
        })
    }

    async deleteProducts (req: Request, res: Response) {
        const {id} = req.params;

        if(!id) {
            return res.status(404).json({
                msg: "es necesario definir un id"
            })
        }

        const producto = await productsAPI.getProducts(id)
        
        if(!producto) {
            return res.status(400).json ({
                msg: "producto no encontrado"
            }) 
        }
        res.json({
            msg: "El siguiente producto fue borrado",
            data: await productsAPI.deleteProduct(id)
        })
    }
}

export const productsController = new Producto ();

export const getProduct = async (args: any) => {
    return await productsAPI.getProducts(args.id)
}

export const getProducts = async () => {
    return await productsAPI.getProducts()
}

export const addProducts = async (args: any) => {
    return await productsAPI.addProduct(args);
}