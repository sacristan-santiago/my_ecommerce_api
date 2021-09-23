import moment from "moment";
import fs from 'fs/promises';
import {Product, newProduct, ProductQuery }  from '../products.interface';

export class ProductosFSDAO {
    private rutaArchivo: string;

    constructor (fileRoute: string) {
        this.rutaArchivo = fileRoute;
    }
    
    async find (id: string | undefined = undefined) {
        try {
            const data = await fs.readFile(this.rutaArchivo, "utf-8");
            const productos = JSON.parse(data);
            return productos.find((aProduct: any) => aProduct.id == id)
        } catch {
            return console.log("No se encontro el archivo.json del FS");
        }
    }
    
    async get (id: string | undefined = undefined) {
        try {
            
            const data = await fs.readFile(this.rutaArchivo, "utf-8");
            const productos = JSON.parse(data);
            
            if (id) {
                return productos.find((aProduct: any) => aProduct.id == id);
            }
            //console.log(productos)
            return productos
        } catch {
            return console.log([]);
        }
    }
    
    async add (data: newProduct){
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
            const data = await fs.readFile(this.rutaArchivo, "utf-8");
            const productos = JSON.parse(data);

            newItem.id = (productos.length + 1).toString();
            productos.push(newItem);
            await fs.writeFile(this.rutaArchivo, JSON.stringify(productos, null, "\t"));
            console.log("El archivo se modifico!")
        } catch (err:any) {
            console.log('ERROR ==>', err);
            throw new Error(err);
        }
        return newItem;
    }

    async update (id: number, data: newProduct) {
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
            const data = await fs.readFile(this.rutaArchivo, "utf-8");
            let productos = JSON.parse(data);
            
            productos = productos.map((aProduct:any) => {
                if (aProduct.id !== id ) {
                    return aProduct;
                } else {
                    return replaceItem;
                }
            })

            await fs.writeFile(this.rutaArchivo, JSON.stringify(productos, null, "\t"));
            console.log("El archivo se modifico!")
        } catch (err:any) {
            console.log('ERROR ==>', err);
            throw new Error(err);
        }
        
        return replaceItem; 
    }

    async delete(id: string): Promise<Product> {
        try {
            const data = await fs.readFile(this.rutaArchivo, "utf-8");
            let productos = JSON.parse(data);

            const deletedProduct = productos.filter((aProduct: any) => aProduct.id == id);
            productos = productos.filter((aProduct: any)=> aProduct.id !== id);
   
            await fs.writeFile(this.rutaArchivo, JSON.stringify(productos, null, "\t"));
            console.log("El archivo se elimino!")
            console.log(deletedProduct)
            return deletedProduct;

        } catch (err:any) {
            console.log('ERROR ==>', err);
            throw new Error(err);
        }
    }

    async query(options: ProductQuery) {
        try {
            const data = await fs.readFile(this.rutaArchivo, "utf-8");
            let productos = JSON.parse(data);

            type Conditions = (aProduct: Product) => boolean;
            const query: Conditions[] = [];
            
            if (options.nombre)
              query.push((aProduct: Product) => aProduct.nombre == options.nombre);
        
            if (options.codigo)
              query.push((aProduct: Product) => aProduct.codigo == options.codigo);

            if (options.precioMin) {
                query.push((aProduct: Product) => aProduct.precio >= Number(options.precioMin));
            }

            if (options.precioMax) {
                query.push((aProduct: Product) => aProduct.precio <= Number(options.precioMax));
            }

            if (options.stockMin) {
                query.push((aProduct: Product) => aProduct.stock >= Number(options.stockMin));
            }

            if (options.stockMax) {
                query.push((aProduct: Product) => aProduct.stock <= Number(options.stockMax));
            }
              
            return productos.filter((aProduct: Product) => query.every((x) => x(aProduct)));
        
        } catch (err) {
            console.log("ERROR");
            console.log(err);
        }
      }
}