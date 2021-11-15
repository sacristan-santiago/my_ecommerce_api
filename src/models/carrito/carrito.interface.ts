import { Schema } from "mongoose"
import {MongoProduct, Product} from "../products/products.interface"

export type productReference = Schema.Types.ObjectId | string

export interface CartI {
    _id: string,
    userId: productReference
    timestamp: string,
    products: MongoProduct[],
}

export interface OrderI {
  _id: string,
  cartId: productReference
  userId: productReference
  timestamp: string,
  products: MongoProduct[],
}

export interface ProductCart {
    _id: string;
    amount: number;
  }
  
  export interface CartBaseClass {
    get(id: string): Promise<CartI>;
    createCart(userId: string): Promise<CartI>;
    addProduct(cartId: string, product: ProductCart): Promise<CartI>;
    deleteProduct(cartId: string, product: ProductCart): Promise<CartI>;
  }