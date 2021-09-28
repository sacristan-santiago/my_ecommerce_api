import {newProduct, Product, ProductBaseClass, ProductQuery} from '../products.interface';
import moment from "moment";
import faker from "faker";

export class ProductosMemDAO implements ProductBaseClass {
  private productos: Product[] = [];

  constructor() {
    const mockData = [
        {
          id: '1',
          timestamp: '27.8.21 15:03:30',
          nombre: 'lapiz1',
          descripcion: 'lapiz de caracteristicas 1',
          codigo: 'ASD123',
          foto: 'https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png',
          precio: 200,
          stock: 10
        },
        {
          id: '2',
          timestamp: '20.9.21 21:29:15',
          nombre: 'Lapiz UPDATEADO',
          descripcion: 'lapiz de caracteristicas 2',
          codigo: 'ASD666',
          foto: 'https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png',
          precio: 200,
          stock: 10
        },
        {
          id: '3',
          timestamp: '20.9.21 21:35:15',
          nombre: 'Lapiz UPDATEADO',
          descripcion: 'lapiz de caracteristicas 3',
          codigo: 'ASD666',
          foto: 'https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png',
          precio: 200,
          stock: 10
        },
        {
          id: '4',
          timestamp: '27.8.21 15:03:32',
          nombre: 'lapiz4',
          descripcion: 'lapiz de caracteristicas 4',
          codigo: 'ASD423',
          foto: 'https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png',
          precio: 230,
          stock: 13
        },
        {
          id: '5',
          timestamp: '27.8.21 15:03:32',
          nombre: 'lapiz5',
          descripcion: 'lapiz de caracteristicas 5',
          codigo: 'ASD523',
          foto: 'https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png',
          precio: 240,
          stock: 14
        }
      ]

    mockData.forEach((aMock) => this.productos.push(aMock));
  }

  findIndex(id: string) {
    return this.productos.findIndex((aProduct) => aProduct.id == id);
  }

  find(id: string): Product | undefined {
    return this.productos.find((aProduct) => aProduct.id === id);
  }

  async get(id?: string): Promise<Product[]> {
    if (id) {
      return this.productos.filter((aProduct) => aProduct.id === id);
    }
    return this.productos;
  }

  async add(data: newProduct): Promise<Product> {
    if (!data.nombre || !data.precio) throw new Error('invalid data');

    const newItem: Product = {
        id: (this.productos.length + 1).toString(),
        timestamp: moment().format("D.M.YY HH:mm:ss"),
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: data.codigo,
        foto: data.foto,
        precio: Number(data.precio),
        stock: Number(data.stock),
    };

    this.productos.push(newItem);

    return newItem;
  }

  async update(id: string, newProductData: newProduct): Promise<Product> {
    const index = this.findIndex(id);
    const oldProduct = this.productos[index];

    const updatedProduct: Product = { ...oldProduct, ...newProductData };
    this.productos.splice(index, 1, updatedProduct);
    return updatedProduct;
  }

  async delete (id: string): Promise<Product> {
    const index = this.findIndex(id);
    const deletedProduct = this.productos[index];
    this.productos.splice(index, 1);
    return deletedProduct;
  }

  async query(options: ProductQuery): Promise<Product[]> {
    type Conditions = (aProduct: Product) => boolean;
    const query: Conditions[] = [];

    if (options.nombre)
    query.push((aProduct: Product) => aProduct.nombre == options.nombre);

  if (options.codigo)
    query.push((aProduct: Product) => aProduct.codigo == options.codigo);

  if (options.precioMin) {
      query.push((aProduct: Product) => aProduct.precio >= Number(options.precioMin));
  }

  if (options.precioMax) {
      query.push((aProduct: Product) => aProduct.precio <= Number(options.precioMax));
  }

  if (options.stockMin) {
      query.push((aProduct: Product) => aProduct.stock >= Number(options.stockMin));
  }

  if (options.stockMax) {
      query.push((aProduct: Product) => aProduct.stock <= Number(options.stockMax));
  }

    return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
  }

  async generate (id: number) {
    const resultado = [];
    
    for (let i=1; i<=id; i++) {
      const newProduct : Product = {
        id: i.toString(),
        timestamp: faker.date.past().toString(),
        nombre: faker.commerce.productName(),
        descripcion: faker.commerce.productAdjective() + " " + faker.commerce.product() + " made of " + faker.commerce.productMaterial(), 
        codigo: faker.datatype.string(3) + faker.datatype.number(3),
        foto: faker.image.imageUrl(100, 100, "business", true),
        precio: faker.datatype.number({min: 1, max: 200}),
        stock: faker.datatype.number({min: 1, max: 25}),
      }
      resultado.push(newProduct)
    }
    
    return resultado;
  }
}