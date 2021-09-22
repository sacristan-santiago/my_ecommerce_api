export interface newProduct {
    nombre: string,
    descripcion: string,
    codigo: string,
    foto: string,
    precio: number,
    stock: number,
}

export interface Product {
id: string | undefined,
timestamp: string
nombre: string, 
descripcion: string,
codigo: string,
foto: string,
precio: number,
stock: number,
}
  
export interface ProductQuery {
nombre?: string;
precio?: number;
}

export interface ProductBaseClass {
get(id?: string | undefined): Promise<Product[]>;
add(data: newProduct): Promise<Product>;
update(id: string, newProductData: newProduct): Promise<Product>;
delete(id: string): Promise<Product>;
query(options: ProductQuery): Promise<Product[]>;
}