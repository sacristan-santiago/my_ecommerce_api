"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlRoot = exports.graphqlSchema = void 0;
const graphql_1 = require("graphql");
const productos_1 = require("../controllers/productos");
// GraphQL schema
//https://graphql.org/graphql-js/basic-types/
exports.graphqlSchema = graphql_1.buildSchema(`
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
exports.graphqlRoot = {
    getProducts: productos_1.getProducts,
    getProduct: productos_1.getProduct,
    addProducts: productos_1.addProducts
};
