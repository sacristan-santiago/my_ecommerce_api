import moment from "moment";
import fs from 'fs/promises';
import path from 'path';

const carritoRute = "../database/carrito.txt"

interface Product {
    id: number,
    timestamp: string
    nombre: string, 
    descripcion: string,
    codigo: string,
    foto: string,
    precio: number,
    stock: number,
}

class Carrito {
    async findProduct (id: number | undefined = undefined) {
        try {
            const ruta = path.resolve(__dirname, carritoRute);
            const data = await fs.readFile(ruta, "utf-8");
            const carrito = JSON.parse(data);

            return carrito.productos.find((aProduct: any) => aProduct.id == Number(id));
        
        } catch {
            return console.log("no se encontro el archivo");
        }
    }
    
    async getProducts (id: number | undefined = undefined) {
        try {
            const ruta = path.resolve(__dirname, carritoRute);
            const data = await fs.readFile(ruta, "utf-8");
            const carrito = JSON.parse(data);

            if (id) {
                return carrito.productos.find((aProduct: any) => aProduct.id == Number(id));
            }

            return carrito.productos

        } catch {
            return console.log("no se encontro el archivo");
        }
    }
    
    async addProduct (newProduct: any){
        try {
            const ruta = path.resolve(__dirname, carritoRute);
            const data = await fs.readFile(ruta, "utf-8");
            const carrito = JSON.parse(data);
            
            carrito.productos.push(newProduct);

            await fs.writeFile(ruta, JSON.stringify(carrito, null, "\t"));
            console.log("El producto fue agregado al carrito!")
            
            return newProduct;

        } catch {
            return console.log("no se encontro el archivo");
        }
    }

    async deleteProduct(id: number) {
        try {
            const ruta = path.resolve(__dirname, carritoRute);
            const data = await fs.readFile(ruta, "utf-8");
            const carrito = JSON.parse(data);
            
            const deletedProduct = carrito.productos.filter((aProduct:any)=> aProduct.id == Number(id));
            carrito.productos = carrito.productos.filter((aProduct:any) => aProduct.id !== Number(id));
            
            await fs.writeFile(ruta, JSON.stringify(carrito, null, "\t"));
            console.log("El producto fue eliminado del carrito!")
            
            return deletedProduct;

        } catch {
            return console.log("no se encontro el archivo");
        }
    }
}

export const carritoPersistencia = new Carrito ();