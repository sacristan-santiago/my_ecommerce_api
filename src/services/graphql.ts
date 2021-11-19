import { buildSchema } from "graphql"
import {getProduct, getProducts, addProducts} from '../controllers/productos'

// GraphQL schema
//https://graphql.org/graphql-js/basic-types/
export const graphqlSchema = buildSchema(`
    type Query {
        getProducts: [Product],
        getProduct(id: String): Product
    },
    type Mutation {
        addProducts (
            uID: Int!,
            timestamp: String,
            nombre: String,
            descripcion: String,
            codigo: String,
            foto: String,
            precio: Float,
            stock: Int
        ): Product
    },
    type Product {
        _id: String
        uID: Int
        timestamp: String
        nombre: String
        descripcion: String
        codigo: String
        foto: String
        precio: Float
        stock: Int
    }
`);

// Root resolver
export const graphqlRoot = {
    getProducts,
    getProduct,
    addProducts
};