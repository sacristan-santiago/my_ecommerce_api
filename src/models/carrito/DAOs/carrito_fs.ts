import moment from "moment";
import fs from 'fs/promises';

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

export class CarritoFSDAO {
    private rutaArchivo: string;

    private static instance: CarritoFSDAO

    public static getInstance(fileRoute: string): CarritoFSDAO {
        if (!CarritoFSDAO.instance) {
            CarritoFSDAO.instance = new CarritoFSDAO(fileRoute)
        }
        
        return CarritoFSDAO.instance
    }
    
    private constructor (fileRoute: string) {
        this.rutaArchivo = fileRoute;
    }

    async findProduct (id: string | undefined = undefined) {
        try {
            const data = await fs.readFile(this.rutaArchivo, "utf-8");
            const carrito = JSON.parse(data);

            return carrito.productos.find((aProduct: any) => aProduct.id == id);
        
        } catch {
            return console.log("no se encontro el archivo");
        }
    }
    
    async getProducts (id: string | undefined = undefined) {
        try {
            const data = await fs.readFile(this.rutaArchivo, "utf-8");
            const carrito = JSON.parse(data);

            if (id) {
                return carrito.productos.find((aProduct: any) => aProduct.id == id);
            }

            return carrito.productos;

        } catch {
            return console.log("no se encontro el archivo");
        }
    }
    
    async addProduct (newProduct: any){
        try {
            const data = await fs.readFile(this.rutaArchivo, "utf-8");
            const carrito = JSON.parse(data);
            
            //Agrego producto y actulizo timestamp del carrito
            carrito.productos.push(newProduct);
            carrito.timestamp = moment().format("D.M.YY HH:mm:ss");

            await fs.writeFile(this.rutaArchivo, JSON.stringify(carrito, null, "\t"));
            console.log("El producto fue agregado al carrito!")
            
            return newProduct;

        } catch {
            return console.log("no se encontro el archivo");
        }
    }

    async deleteProduct(id: string) {
        try {
            const data = await fs.readFile(this.rutaArchivo, "utf-8");
            const carrito = JSON.parse(data);
            
            const deletedProduct = carrito.productos.filter((aProduct:any)=> aProduct.id == id);
            
            //borro producto y actualizo timestamp del carrito 
            carrito.productos = carrito.productos.filter((aProduct:any) => aProduct.id !== id);
            carrito.timestamp = moment().format("D.M.YY HH:mm:ss");
            
            await fs.writeFile(this.rutaArchivo, JSON.stringify(carrito, null, "\t"));
            console.log("El producto fue eliminado del carrito!")
            
            return deletedProduct;

        } catch {
            return console.log("no se encontro el archivo");
        }
    }
}