import mongoose, { Schema } from 'mongoose';
import Config from '../../../config';
import { CartI, ProductCart, CartBaseClass, OrderI } from '../carrito.interface';
import { altasService } from "../../../services/atlasDB";
import { carritomodel } from '../../../schemas/carrito';
import { carritoAPI } from '../../../apis/carrito';
import { ordermodel } from '../../../schemas/order';
import { logger } from '../../../services/logger/logger';
import { json } from 'express';

export class CarritoATLASMONGODAO implements CartBaseClass {

  private static instance: CarritoATLASMONGODAO

  private constructor() { }

  public static getInstance(): CarritoATLASMONGODAO {
      if (!CarritoATLASMONGODAO.instance) {
        CarritoATLASMONGODAO.instance = new CarritoATLASMONGODAO()
      }
      
      return CarritoATLASMONGODAO.instance
  }

  async get(userId: string): Promise<CartI> {
    const result: any = await carritomodel.findOne({ userId });

    if (!result) throw new Error('id not found');

    return result;
  }

  async createCart(userId: string): Promise<CartI> {
    const newCart: any = new carritomodel({
      userId,
      products: [],
    });

    await newCart.save();

    return newCart;
  }

  async clearCart(cartId: string) {
    const cart: any = await carritomodel.findById(cartId);
    
    await cart.save();
    
    return cart

  }

  productExist(cart: CartI, productId: string): boolean {
    const index = cart.products.findIndex(
      (aProduct) => aProduct._id == productId
    );

    if (index < 0) return false;

    return true;
  }

  async addProduct(cartId: string, product: ProductCart): Promise<CartI> {
    const cart: any = await carritomodel.findById(cartId);
    if (!cart) throw new Error('Cart not found');

    const index = cart.products.findIndex(
      (aProduct: any) => aProduct._id == product._id
    );

    if (index < 0) cart.products.push(product);
    else cart.products[index].amount += product.amount;

    await cart.save();

    return cart;
  }

  async deleteProduct(cartId: string, product: ProductCart): Promise<CartI> {
    const cart: any = await carritomodel.findById(cartId);
    if (!cart) throw new Error('Cart not found');

    const index: any = cart.products.findIndex(
      (aProduct: any) => aProduct._id == product._id
    );

    if (index < 0) throw new Error('Product not found');

    if (cart.products[index].amount <= product.amount)
      cart.products.splice(index, 1);
    else cart.products[index].amount -= product.amount;

    await cart.save();
    return cart;
  }

  async submitCart(userId: string): Promise<OrderI | undefined> {
    try {
      const cart: any = await carritomodel.findOne({ userId });
      if (!cart) throw new Error('id not found');
      
      const newOrder: any = new ordermodel({
        userId: cart.userId,
        products: cart.products
      })

      await newOrder.save()
      return newOrder
    }  catch (e) {
      logger.error(e);
    }
  }
}