import {Request, Response, NextFunction} from "express";
import {productsPersistencia} from "../persistencia/productos";

class Producto {
    async getProducts (req: Request, res: Response) {
        const {id} = req.params;
        
        if (id) {
            const producto = await productsPersistencia.get(Number(id));

            if (!producto) {
                return res.status(404).json ({
                    msg: "Producto no encontrado",
                })
            }

            return res.json({
                producto: producto,
            })
        }

        res.json({
            productos: await productsPersistencia.get(),
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
        const newItem = await productsPersistencia.add(req.body);

        res.json({
            msg: "Producto agregado con exito",
            data: newItem
        })
    }

    async updateProducts (req: Request, res: Response) {
        const id = Number(req.params.id);
        const producto = await productsPersistencia.find(id)

        if (!producto) {
            return res.status(404).json ({
                msg: "Producto no encontrado",
            })
        }

        res.json({
            msg: "producto actualizado",
            data: await productsPersistencia.update(id, req.body)
        })
    }

    async deleteProducts (req: Request, res: Response) {
        const {id} = req.params;

        if(!id) {
            return res.status(404).json({
                msg: "es necesario definir un id"
            })
        }

        const producto = await productsPersistencia.find(Number(id));

        if(!producto) {
            return res.status(400).json ({
                msg: "producto no encontrado"
            }) 
        }
        
        res.json({
            msg: "Producto borrado",
            data: await productsPersistencia.delete(Number(id)),
        })
    }
}

export const productsController = new Producto ();