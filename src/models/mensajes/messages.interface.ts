export interface Author {
    email: string,
    nombre: string,
    apellido: string,
    alias: string,
    edad: number,
    avatar: string,
}

export interface Message {
    author: Author,
    text: string,
    time: string,
}

