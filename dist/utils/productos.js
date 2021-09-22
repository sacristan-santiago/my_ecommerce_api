"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataOrdered = void 0;
const dataOrdered = (data) => {
    const { id, timestamp, nombre, descripcion, codigo, foto, precio, stock } = data;
    return {
        id: id,
        timestamp: timestamp,
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock,
    };
};
exports.dataOrdered = dataOrdered;
