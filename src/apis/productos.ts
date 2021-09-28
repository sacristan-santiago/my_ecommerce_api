import {Product, newProduct, ProductQuery }  from '../models/products/products.interface';
import { ProductosFactoryDAO } from '../models/products/products.factory';
import { TipoPersistencia } from '../models/products/products.factory';

/**
 * Con esta variable elegimos el tipo de persistencia
 */
export const tipoPersistencia = TipoPersistencia.Memoria;

class prodAPI {
  private productos: any;

  constructor() {
    this.productos = ProductosFactoryDAO.get(tipoPersistencia);
  }

  async getProducts(id: string | undefined = undefined): Promise<Product[]> {
    if (id) return this.productos.get(id);

    return this.productos.get();
  }

  async addProduct(productData: newProduct): Promise<Product> {
    const newProduct = await this.productos.add(productData);
    return newProduct;
  }

  async updateProduct(id: string, productData: newProduct) {
    const updatedProduct = await this.productos.update(id, productData);
    return updatedProduct;
  }

  async deleteProduct(id: string) {
    return await this.productos.delete(id);
  }

  async query(options: ProductQuery) {
    return await this.productos.query(options);
  }

  async generateProducts(quantity: number) {
    
    return await this.productos.generate(quantity);
  }
}

export const productsAPI = new prodAPI();