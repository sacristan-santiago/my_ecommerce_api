import {Request, Response, NextFunction} from "express";
import {carritoAPI} from "../apis/carrito";
import {productsAPI} from "../apis/productos"
import { Product } from "../models/products/products.interface";
// import {carritoQuery} from "../models/carrito/carrito.interface";

class Carrito {
    async getProductosCarrito (req: Request, res: Response) {
        const id = req.params.id;
        
        if (id) {
            const productoCarrito = await carritoAPI.getProducts(id);

            if (!productoCarrito) {
                return res.status(404).json ({
                    msg: "Producto no encontrado en carrito",
                })
            }

            return res.json({
                carritoProducto: productoCarrito,
            })
        }

        res.json({
            carritoProductos: await carritoAPI.getProducts(),
        })
    }

    async addProductoCarrito (req: Request, res: Response) {
        const id = req.params.id;
        
        if (await carritoAPI.getProducts(id)) {
            return res.json ({
                msg: "El producto ya se encuentra en el carrito",
            })
        }
        //AGREGO PRODUCTO AL CARRITO DESDE LA PERSISTENCIA DE PRODUCTOS
        const newItem = await productsAPI.getProducts(id)
        console.log(newItem);
       
        if (!newItem) {
            return res.status(404).json ({
                msg: "Producto no encontrado en base datos de productos",
            })
        } else {
            return res.json({
                msg: "Nuevo producto agregado al carrito",
                nuevoProducto: await carritoAPI.addProduct(newItem),
            })
        }
    }

    async deleteProductoCarrito (req: Request, res: Response) {
        const id = req.params.id;

        if(!id) {
            return res.status(404).json({
                msg: "Es necesario definir un id"
            })
        }

        const producto = await carritoAPI.findProduct(id);

        if(!producto) {
            return res.status(400).json ({
                msg: "Producto no encontrado en el carrito"
            }) 
        }
        
        res.json({
            msg: "Producto borrado del carrito",
            producto: await carritoAPI.deleteProduct(id),
        })
    }
}

export const carritoController = new Carrito ();