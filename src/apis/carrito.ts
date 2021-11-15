import {CartI, OrderI }  from '../models/carrito/carrito.interface';
import { CarritoFactoryDAO } from '../models/carrito/carrito.factory';
import { TipoPersistencia } from '../models/products/products.factory';
import { tipoPersistencia } from './productos';
import { usuariosAPI } from "./usuarios"
import { productsAPI } from "./productos"

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
  
    async addProduct(
      cartId: string,
      productId: string,
      amount: number
    ): Promise<CartI> {
      const product = (await productsAPI.getProducts(productId))[0];
  
      const addProduct = {
        _id: productId,
        nombre: product.nombre,
        precio: product.precio,
        amount,
      };
  
      const updatedCart = await this.carrito.addProduct(cartId, addProduct);
      return updatedCart;
    }
  
    async deleteProduct(cartId: string, productId: string, amount: number) {
      const product = (await productsAPI.getProducts(productId))[0];
  
      const deleteProduct = {
        _id: productId,
        nombre: product.nombre,
        precio: product.precio,
        amount,
      };
  
      const updatedCart = await this.carrito.deleteProduct(cartId, deleteProduct);
      return updatedCart;
    }

    async clearCart(cartId: string) {
      await this.carrito.clearCart(cartId)
    }

    async submitCart(userId: string): Promise<OrderI> {
      const order = await this.carrito.submitCart(userId)
      return order
    }
  }
  
  export const carritoAPI = new CarritoAPI();