export interface IRead<T> {
   get(id: String | undefined): Promise<any>
}

