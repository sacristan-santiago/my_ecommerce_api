import {Request, Response, NextFunction} from "express";
import {productsPersistencia} from "../persistencia/productos";

class Producto {
    getProducts (req: Request, res: Response) {
        const {id} = req.params;
        
        if (id) {
            const producto = productsPersistencia.get(Number(id));

            if (!producto) {
                return res.status(404).json ({
                    msg: "Producto no encontrado",
                })
            }

            return res.json({
                data: producto,
            })
        }

        res.json({
            data: productsPersistencia.get(),
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
    

    addProducts (req: Request, res: Response) {
        const newItem = productsPersistencia.add(req.body);

        res.json({
            msg: "Producto agregado con exito",
            data: newItem
        })
    }

    updateProducts (req: Request, res: Response) {
        const id = Number(req.params.id);

        const producto = productsPersistencia.find(id)

        if (!producto) {
            return res.status(404).json ({
                msg: "Producto no encontrado",
            })
        }

        res.json({
            msg: "producto actualizado",
            data: productsPersistencia.update(id, req.body)
        })
    }

    deleteProducts (req: Request, res: Response) {
        const {id} = req.params;

        if(!id) {
            return res.status(404).json({
                msg: "es necesario definir un id"
            })
        }

        const producto = productsPersistencia.find(Number(id));

        if(!producto) {
            return res.status(400).json ({
                msg: "producto no encontrado"
            }) 
        }
        
        res.json({
            msg: "Producto borrado",
            data: productsPersistencia.delete(Number(id)),
        })
    }
}

export const productsController = new Producto ();