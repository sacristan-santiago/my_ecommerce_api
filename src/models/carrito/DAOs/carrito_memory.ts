import moment from "moment";
import {CartI} from "../carrito.interface"
import {Product, MongoProduct} from "../../products/products.interface"


export class CarritoMemDAO {
    carrito: any
    
    constructor () {
        const mockData = {
            _id: "1",
            userId: "sadasd",
            timestamp: "23.9.21 13:35:42",
            products: [
                {
                  _id: '2',
                  uID: "asdsada",
                  timestamp: '27.8.21 18:09:52',
                  nombre: 'lapiz2',
                  descripcion: 'lapiz de caracteristicas 2',
                  codigo: 'ASD223',
                  foto: 'https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png',
                  precio: 210,
                  stock: 11
                },
                {
                  _id: '3',
                  uID: "asda",
                  timestamp: '27.8.21 18:09:52',
                  nombre: 'lapiz3',
                  descripcion: 'lapiz de caracteristicas 3',
                  codigo: 'ASD323',
                  foto: 'https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png',
                  precio: 220,
                  stock: 12
                },
              ]
        }
        
        this.carrito = mockData
    }

    findIndex(id: string) {
        return this.carrito.products.findIndex((aProduct: any) => aProduct.id == id);
    }
    


    async findProduct (id: string | undefined = undefined) {
            return this.carrito.products.find((aProduct: Product) => aProduct.id == id);
    }
    
    async getProducts (id: string | undefined = undefined) {
            if (id) {
                return this.carrito.products.find((aProduct: any) => aProduct.id == id);
            }

            return this.carrito.products
    }
    
    async addProduct (newItem: MongoProduct[]){
            const newProduct = newItem[0]
            //Agrego producto y actulizo timestamp del carrito
            this.carrito.products.push(newProduct);
            this.carrito.timestamp = moment().format("D.M.YY HH:mm:ss");

            console.log("El producto fue agregado al carrito!")
            
            console.log(newProduct)
            return newProduct;
    }

    async deleteProduct(id: string) {
            const deletedProduct = this.carrito.products.find((aProduct:any)=> aProduct.id == id);
            
            //borro producto y actualizo timestamp del carrito 
            this.carrito.products = this.carrito.products.filter((aProduct:any) => aProduct.id !== id);
            this.carrito.timestamp = moment().format("D.M.YY HH:mm:ss");
            console.log("El producto fue eliminado del carrito!");
                
            return deletedProduct;
    }
}