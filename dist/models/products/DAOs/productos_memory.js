"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosMemDAO = void 0;
const moment_1 = __importDefault(require("moment"));
class ProductosMemDAO {
    constructor() {
        this.productos = [];
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
        ];
        mockData.forEach((aMock) => this.productos.push(aMock));
    }
    findIndex(id) {
        return this.productos.findIndex((aProduct) => aProduct.id == id);
    }
    find(id) {
        return this.productos.find((aProduct) => aProduct.id === id);
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                return this.productos.filter((aProduct) => aProduct.id === id);
            }
            return this.productos;
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.nombre || !data.precio)
                throw new Error('invalid data');
            const newItem = {
                id: (this.productos.length + 1).toString(),
                timestamp: moment_1.default().format("D.M.YY HH:mm:ss"),
                nombre: data.nombre,
                descripcion: data.descripcion,
                codigo: data.codigo,
                foto: data.foto,
                precio: Number(data.precio),
                stock: Number(data.stock),
            };
            this.productos.push(newItem);
            return newItem;
        });
    }
    update(id, newProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.findIndex(id);
            const oldProduct = this.productos[index];
            const updatedProduct = Object.assign(Object.assign({}, oldProduct), newProductData);
            this.productos.splice(index, 1, updatedProduct);
            return updatedProduct;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.findIndex(id);
            const deletedProduct = this.productos[index];
            this.productos.splice(index, 1);
            return deletedProduct;
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = [];
            if (options.nombre)
                query.push((aProduct) => aProduct.nombre == options.nombre);
            if (options.codigo)
                query.push((aProduct) => aProduct.codigo == options.codigo);
            if (options.precioMin) {
                query.push((aProduct) => aProduct.precio >= Number(options.precioMin));
            }
            if (options.precioMax) {
                query.push((aProduct) => aProduct.precio <= Number(options.precioMax));
            }
            if (options.stockMin) {
                query.push((aProduct) => aProduct.stock >= Number(options.stockMin));
            }
            if (options.stockMax) {
                query.push((aProduct) => aProduct.stock <= Number(options.stockMax));
            }
            return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
        });
    }
}
exports.ProductosMemDAO = ProductosMemDAO;
