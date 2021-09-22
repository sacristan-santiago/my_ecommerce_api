export const dataOrdered = (data: any) => {
    const {id, timestamp, nombre, descripcion, codigo, foto, precio, stock} = data;
    return {
        id: id,
        timestamp: timestamp,
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock, 
    }
}