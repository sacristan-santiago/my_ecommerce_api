import {Request, Response, NextFunction} from "express";
import {carritoPersistencia} from "../persistencia/carrito";
import {productsPersistencia} from "../persistencia/productosFS"

class Carrito {
    async getProductosCarrito (req: Request, res: Response) {
        const id = Number(req.params.id);
        
        if (id) {
            const productoCarrito = await carritoPersistencia.getProducts(id);

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
            carritoProductos: await carritoPersistencia.getProducts(),
        })
    }

    async addProductoCarrito (req: Request, res: Response) {
        const id = Number(req.params.id);
        
        if (await carritoPersistencia.getProducts(id)) {
            return res.json ({
                msg: "El producto ya se encuentra en el carrito",
            })
        }
        //AGREGO PRODUCTO AL CARRITO DESDE LA PERSISTENCIA DE PRODUCTOS
        const newItem = await productsPersistencia.find(id);
       
        if (!newItem) {
            return res.status(404).json ({
                msg: "Producto no encontrado en base datos de productos",
            })
        } else {
            await carritoPersistencia.addProduct(newItem);
            return res.json({
                msg: "Nuevo producto agregado al carrito",
                nuevoProducto: newItem,
            })
        }
    }

    async deleteProductoCarrito (req: Request, res: Response) {
        const id = Number(req.params.id);

        if(!id) {
            return res.status(404).json({
                msg: "Es necesario definir un id"
            })
        }

        const producto = await carritoPersistencia.findProduct(id);

        if(!producto) {
            return res.status(400).json ({
                msg: "Producto no encontrado en el carrito"
            }) 
        }
        
        res.json({
            msg: "Producto borrado del carrito",
            producto: await carritoPersistencia.deleteProduct(id),
        })
    }
}

export const carritoController = new Carrito ();