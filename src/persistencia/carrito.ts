let carrito = {
    id: 1, 
    timestamp: Date.now(),
    productos: [
        {id: 2, nombre: "lapiz2", precio: 210},
        {id: 3, nombre: "lapiz3", precio: 220},
        {id: 5, nombre: "lapiz5", precio: 240},
    ]
}

interface Product {
    id: number,
    nombre: string, 
    precio: number 
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

