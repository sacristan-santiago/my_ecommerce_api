import moment from "moment";
import {Carrito} from "../carrito.interface"
import {Product} from "../../products/products.interface"


export class CarritoMemDAO {
    carrito: Carrito
    
    constructor () {
        const mockData = {
            id: "1",
            timestamp: "23.9.21 13:35:42",
            productos: [
                {
                  id: '2',
                  timestamp: '27.8.21 18:09:52',
                  nombre: 'lapiz2',
                  descripcion: 'lapiz de caracteristicas 2',
                  codigo: 'ASD223',
                  foto: 'https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png',
                  precio: 210,
                  stock: 11
                },
                {
                  id: '3',
                  timestamp: '27.8.21 18:09:52',
                  nombre: 'lapiz3',
                  descripcion: 'lapiz de caracteristicas 3',
                  codigo: 'ASD323',
                  foto: 'https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png',
                  precio: 220,
                  stock: 12
                },
                {
                  id: '5',
                  timestamp: '27.8.21 18:09:52',
                  nombre: 'lapiz5',
                  descripcion: 'lapiz de caracteristicas 5',
                  codigo: 'ASD523',
                  foto: 'https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png',
                  precio: 240,
                  stock: 14
                }
              ]
        }
        
        this.carrito = mockData
    }

    findIndex(id: string) {
        return this.carrito.productos.findIndex((aProduct) => aProduct.id == id);
    }
    


    async findProduct (id: string | undefined = undefined) {
            return this.carrito.productos.find((aProduct: Product) => aProduct.id == id);
    }
    
    async getProducts (id: string | undefined = undefined) {
            if (id) {
                return this.carrito.productos.find((aProduct: any) => aProduct.id == id);
            }

            return this.carrito.productos
    }
    
    async addProduct (newItem: Product[]){
            const newProduct = newItem[0]
            //Agrego producto y actulizo timestamp del carrito
            this.carrito.productos.push(newProduct);
            this.carrito.timestamp = moment().format("D.M.YY HH:mm:ss");

            console.log("El producto fue agregado al carrito!")
            
            console.log(newProduct)
            return newProduct;
    }

    async deleteProduct(id: string) {
            const deletedProduct = this.carrito.productos.find((aProduct:any)=> aProduct.id == id);
            
            //borro producto y actualizo timestamp del carrito 
            this.carrito.productos = this.carrito.productos.filter((aProduct:any) => aProduct.id !== id);
            this.carrito.timestamp = moment().format("D.M.YY HH:mm:ss");
            console.log("El producto fue eliminado del carrito!");
                
            return deletedProduct;
    }
}