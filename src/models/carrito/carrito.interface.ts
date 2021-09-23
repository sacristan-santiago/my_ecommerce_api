import {Product} from "../products/products.interface"

export interface Carrito {
    id: string,
    timestamp: string,
    productos: Product[],
}

