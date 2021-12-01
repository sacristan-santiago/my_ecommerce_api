export class Product {
    timestamp: string
    nombre: string
    descripcion: string
    codigo: string
    foto: string
    precio: number
    stock: number

    constructor(
        nombre: string, 
        descripcion: string,
        codigo: string,
        foto: string,
        precio: number,
        stock: number
    ) {
        this.timestamp = (new Date).toString()
        this.nombre = nombre
        this.descripcion = descripcion
        this.codigo = codigo
        this.foto = foto
        this.precio = precio
        this.stock = stock
    }

}