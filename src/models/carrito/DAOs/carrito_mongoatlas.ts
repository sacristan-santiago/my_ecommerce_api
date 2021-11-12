import mongoose, { Schema } from 'mongoose';
import Config from '../../../config';
import { CartI, ProductCart, CartBaseClass } from '../carrito.interface';
import { altasService } from "../../../services/atlasDB";
import { carritomodel } from '../../../schemas/carrito';

export class CarritoATLASMONGODAO implements CartBaseClass {

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
}