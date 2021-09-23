import {Product, newProduct, ProductQuery }  from '../models/products/products.interface';
import { CarritoFactoryDAO } from '../models/carrito/carrito.factory';
import { TipoPersistencia } from '../models/products/products.factory';
import { tipoPersistencia } from './productos';

class CarritoAPI {
    private carrito: any;
  
    constructor() {
      this.carrito = CarritoFactoryDAO.get(tipoPersistencia);
    }
  
    async findProduct (id: string | undefined = undefined) {
        return this.carrito.findProduct(id);
    }
    
    async getProducts (id: string | undefined = undefined) {
        if (id) return this.carrito.getProducts(id);

        return this.carrito.getProducts();
    }

    async addProduct (newItem: any) {
        const newProduct= await this.carrito.addProduct(newItem)
        return newProduct;
    }

    async deleteProduct(id: string) {
        return await this.carrito.deleteProduct(id);
    }

  }
  
  export const carritoAPI = new CarritoAPI();