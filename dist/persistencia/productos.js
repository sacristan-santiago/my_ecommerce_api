"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsPersistencia = void 0;
const moment_1 = __importDefault(require("moment"));
let productos = [
    { id: 1, timestamp: moment_1.default().format("D.M.YY HH:mm:ss"), nombre: "lapiz1", descripcion: "lapiz de caracteristicas 1", codigo: "ASD123", foto: "https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png", precio: 200, stock: 10 },
    { id: 2, timestamp: moment_1.default().format("D.M.YY HH:mm:ss"), nombre: "lapiz2", descripcion: "lapiz de caracteristicas 2", codigo: "ASD223", foto: "https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png", precio: 210, stock: 11 },
    { id: 3, timestamp: moment_1.default().format("D.M.YY HH:mm:ss"), nombre: "lapiz3", descripcion: "lapiz de caracteristicas 3", codigo: "ASD323", foto: "https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png", precio: 220, stock: 12 },
    { id: 4, timestamp: moment_1.default().format("D.M.YY HH:mm:ss"), nombre: "lapiz4", descripcion: "lapiz de caracteristicas 4", codigo: "ASD423", foto: "https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png", precio: 230, stock: 13 },
    { id: 5, timestamp: moment_1.default().format("D.M.YY HH:mm:ss"), nombre: "lapiz5", descripcion: "lapiz de caracteristicas 5", codigo: "ASD523", foto: "https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png", precio: 240, stock: 14 },
];
class Productos {
    find(id = undefined) {
        return productos.find(aProduct => aProduct.id == Number(id));
    }
    get(id = undefined) {
        if (id) {
            return productos.find(aProduct => aProduct.id == Number(id));
        }
        return productos;
    }
    add(data) {
        const newItem = {
            id: productos.length + 1,
            timestamp: moment_1.default().format("D.M.YY HH:mm:ss"),
            nombre: data.nombre,
            descripcion: data.descripcion,
            codigo: data.codigo,
            foto: data.foto,
            precio: Number(data.precio),
            stock: Number(data.stock),
        };
        productos.push(newItem);
        return newItem;
    }
    update(id, data) {
        const replaceItem = {
            id: id,
            timestamp: moment_1.default().format("D.M.YY HH:mm:ss"),
            nombre: data.nombre,
            descripcion: data.descripcion,
            codigo: data.codigo,
            foto: data.foto,
            precio: Number(data.precio),
            stock: Number(data.stock)
        };
        productos = productos.map(aProduct => {
            if (aProduct.id !== id) {
                return aProduct;
            }
            else {
                return replaceItem;
            }
        });
        return replaceItem;
    }
    delete(id) {
        const deletedProduct = productos.filter(aProduct => aProduct.id == Number(id));
        productos = productos.filter(aProduct => aProduct.id !== Number(id));
        return deletedProduct;
    }
}
exports.productsPersistencia = new Productos();
