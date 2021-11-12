import {CartI }  from '../models/carrito/carrito.interface';
import { CarritoFactoryDAO } from '../models/carrito/carrito.factory';
import { TipoPersistencia } from '../models/products/products.factory';
import { tipoPersistencia } from './productos';
import { usuariosAPI } from "./usuarios"

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

    async getCart(userId: string): Promise<CartI> {
        return this.carrito.get(userId);
      }
    
      async createCart(userId: string): Promise<CartI> {
        const user = await usuariosAPI.getUsers(userId);
    
        if (!user.length)
          throw new Error('User does not exist. Error creating cart');
    
        const newCart = await this.carrito.createCart(userId);
        return newCart;
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