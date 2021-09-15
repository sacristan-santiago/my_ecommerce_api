import moment from "moment";
import fs from 'fs/promises';
import path from 'path';

const productosRute = "../database/productos.txt"

interface addProduct {
            nombre: string,
            descripcion: string,
            codigo: string,
            foto: string,
            precio: string,
            stock: string,
}

interface Product {
    id: number | undefined,
    timestamp: string
    nombre: string, 
    descripcion: string,
    codigo: string,
    foto: string,
    precio: number,
    stock: number,
}

class Productos {
    async find (id: number | undefined = undefined) {
        try {
            const ruta = path.resolve(__dirname, productosRute);
            const data = await fs.readFile(ruta, "utf-8");
            const productos = JSON.parse(data);
            return productos.find((aProduct: any) => aProduct.id == Number(id))
        } catch {
            return console.log([]);
        }
    }
    
    async get (id: number | undefined = undefined) {
        try {
            const ruta = path.resolve(__dirname, productosRute);
            const data = await fs.readFile(ruta, "utf-8");
            const productos = JSON.parse(data);
            
            if (id) {
                return productos.find((aProduct: any) => aProduct.id == Number(id));
            }
            // console.log(productos)
            return productos
        } catch {
            return console.log([]);
        }
    }
    
    async add (data: addProduct){
        const newItem: Product = {
            id: undefined,
            timestamp: moment().format("D.M.YY HH:mm:ss"),
            nombre: data.nombre,
            descripcion: data.descripcion,
            codigo: data.codigo,
            foto: data.foto,
            precio: Number(data.precio),
            stock: Number(data.stock),
        }
        try {
            const ruta = path.resolve(__dirname, productosRute);
            const data = await fs.readFile(ruta, "utf-8");
            const productos = JSON.parse(data);

            newItem.id = productos.length +1;
            productos.push(newItem);
            await fs.writeFile(ruta, JSON.stringify(productos, null, "\t"));
            console.log("El archivo se modifico!")
        } catch (err:any) {
            console.log('ERROR ==>', err);
            throw new Error(err);
        }
        return newItem;
    }

    async update (id: number, data: addProduct) {
        const replaceItem = {
            id: id,
            timestamp: moment().format("D.M.YY HH:mm:ss"),
            nombre: data.nombre,
            descripcion: data.descripcion,
            codigo: data.codigo,
            foto: data.foto,
            precio: Number(data.precio),
            stock: Number(data.stock)
        }

        try {
            const ruta = path.resolve(__dirname, productosRute);
            const data = await fs.readFile(ruta, "utf-8");
            let productos = JSON.parse(data);
            
            productos = productos.map((aProduct:any) => {
                if (aProduct.id !== id ) {
                    return aProduct;
                } else {
                    return replaceItem;
                }
            })
            
            await fs.writeFile(ruta, JSON.stringify(productos, null, "\t"));
            console.log("El archivo se modifico!")
        } catch (err:any) {
            console.log('ERROR ==>', err);
            throw new Error(err);
        }
        
        return replaceItem; 
    }

    async delete(id: number) {
        try {
            const ruta = path.resolve(__dirname, productosRute);
            const data = await fs.readFile(ruta, "utf-8");
            let productos = JSON.parse(data);

            const deletedProduct = productos.filter((aProduct: any) => aProduct.id == Number(id));
            productos = productos.filter((aProduct: any)=> aProduct.id !== Number(id));

            await fs.writeFile(ruta, JSON.stringify(productos, null, "\t"));
            console.log("El archivo se elimino!")

            return deletedProduct;
        } catch (err:any) {
            console.log('ERROR ==>', err);
            throw new Error(err);
        }
    }
}

export const productsPersistencia = new Productos ();