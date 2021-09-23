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
exports.CarritoMemDAO = void 0;
const moment_1 = __importDefault(require("moment"));
class CarritoMemDAO {
    constructor() {
        const mockData = {
            id: "1",
            timestamp: "23.9.21 13:35:42",
            productos: [
                {
                    id: '2',
                    timestamp: '27.8.21 18:09:52',
                    nombre: 'lapiz2',
                    descripcion: 'lapiz de caracteristicas 2',
                    codigo: 'ASD223',
                    foto: 'https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png',
                    precio: 210,
                    stock: 11
                },
                {
                    id: '3',
                    timestamp: '27.8.21 18:09:52',
                    nombre: 'lapiz3',
                    descripcion: 'lapiz de caracteristicas 3',
                    codigo: 'ASD323',
                    foto: 'https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png',
                    precio: 220,
                    stock: 12
                },
                {
                    id: '5',
                    timestamp: '27.8.21 18:09:52',
                    nombre: 'lapiz5',
                    descripcion: 'lapiz de caracteristicas 5',
                    codigo: 'ASD523',
                    foto: 'https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png',
                    precio: 240,
                    stock: 14
                }
            ]
        };
        this.carrito = mockData;
    }
    findIndex(id) {
        return this.carrito.productos.findIndex((aProduct) => aProduct.id == id);
    }
    findProduct(id = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.carrito.productos.find((aProduct) => aProduct.id == id);
        });
    }
    getProducts(id = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                return this.carrito.productos.find((aProduct) => aProduct.id == id);
            }
            return this.carrito.productos;
        });
    }
    addProduct(newItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = newItem[0];
            //Agrego producto y actulizo timestamp del carrito
            this.carrito.productos.push(newProduct);
            this.carrito.timestamp = moment_1.default().format("D.M.YY HH:mm:ss");
            console.log("El producto fue agregado al carrito!");
            console.log(newProduct);
            return newProduct;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedProduct = this.carrito.productos.find((aProduct) => aProduct.id == id);
            //borro producto y actualizo timestamp del carrito 
            this.carrito.productos = this.carrito.productos.filter((aProduct) => aProduct.id !== id);
            this.carrito.timestamp = moment_1.default().format("D.M.YY HH:mm:ss");
            console.log("El producto fue eliminado del carrito!");
            return deletedProduct;
        });
    }
}
exports.CarritoMemDAO = CarritoMemDAO;
