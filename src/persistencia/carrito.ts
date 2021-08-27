import moment from "moment";

let carrito = {
    id: 1, 
    timestamp: moment().format("D.M.YY HH:mm:ss"),
    productos: [
        { id: 2, timestamp: moment().format("D.M.YY HH:mm:ss"), nombre: "lapiz2", descripcion: "lapiz de caracteristicas 2", codigo: "ASD223", foto: "https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png", precio: 210, stock: 11},
        { id: 3, timestamp: moment().format("D.M.YY HH:mm:ss"), nombre: "lapiz3", descripcion: "lapiz de caracteristicas 3", codigo: "ASD323", foto: "https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png", precio: 220, stock: 12},
        { id: 5, timestamp: moment().format("D.M.YY HH:mm:ss"), nombre: "lapiz5", descripcion: "lapiz de caracteristicas 5", codigo: "ASD523", foto: "https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png", precio: 240, stock: 14},
    ]
}

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
    findProduct (id: number | undefined = undefined) {
        return carrito.productos.find(aProduct => aProduct.id == Number(id));
    }
    
    getProducts (id: number | undefined = undefined) {
        if (id) {
            return carrito.productos.find(aProduct => aProduct.id == Number(id));
        }
        return carrito.productos
    }
    
    addProduct (newProduct: Product){
        carrito.productos.push(newProduct);

        return newProduct;
    }

    deleteProduct(id: number) {
        const deletedProduct = carrito.productos.filter(aProduct => aProduct.id == Number(id));
        carrito.productos = carrito.productos.filter(aProduct => aProduct.id !== Number(id));
        return deletedProduct;
    }
}

export const carritoPersistencia = new Carrito ();

