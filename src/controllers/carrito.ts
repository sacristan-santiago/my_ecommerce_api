import {Request, Response, NextFunction} from "express";
import {carritoPersistencia} from "../persistencia/carrito";
import {productsPersistencia} from "../persistencia/productos"

class Carrito {
    getProductosCarrito (req: Request, res: Response) {
        const id = Number(req.params.id);
        
        if (id) {
            const productoCarrito = carritoPersistencia.getProducts(id);

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
            carritoProductos: carritoPersistencia.getProducts(),
        })
    }

    addProductoCarrito (req: Request, res: Response) {
        const id = Number(req.params.id);
        
        if (carritoPersistencia.getProducts(id)) {
            return res.json ({
                msg: "El producto ya se encuentra en el carrito",
            })
        }
        //AGREGO PRODUCTO AL CARRITO DESDE LA PERSISTENCIA DE PRODUCTOS
        const newItem = productsPersistencia.find(id);
       
        if (!newItem) {
            return res.status(404).json ({
                msg: "Producto no encontrado en base datos de productos",
            })
        } else {
            carritoPersistencia.addProduct(newItem);
            return res.json({
                msg: "Nuevo producto agregado al carrito",
                nuevoProducto: newItem,
            })
        }
    }

    deleteProductoCarrito (req: Request, res: Response) {
        const id = Number(req.params.id);

        if(!id) {
            return res.status(404).json({
                msg: "Es necesario definir un id"
            })
        }

        const producto = carritoPersistencia.findProduct(id);

        if(!producto) {
            return res.status(400).json ({
                msg: "Producto no encontrado en el carrito"
            }) 
        }
        
        res.json({
            msg: "Producto borrado del carrito",
            producto: carritoPersistencia.deleteProduct(id),
        })
    }
}

export const carritoController = new Carrito ();