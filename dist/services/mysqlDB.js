"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlDBService = exports.myMariaDB = exports.sqliteDB = void 0;
const knex_1 = __importDefault(require("knex"));
exports.sqliteDB = knex_1.default({
    client: 'sqlite3',
    connection: { filename: './mydb.sqlite' },
});
exports.myMariaDB = knex_1.default({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ecommerce'
    },
    pool: { min: 0, max: 7 }
});
class CreateDB {
    init() {
        //ProductosDB MySQL_sqliteDB
        exports.sqliteDB.schema.hasTable("productos").then((exists) => {
            if (!exists) {
                console.log("No existe la tabla, vamos a crearla");
                exports.sqliteDB.schema.
                    createTable('productos', (productosTable) => {
                    productosTable.increments();
                    productosTable.timestamp('created_at').defaultTo(exports.myMariaDB.fn.now());
                    productosTable.string('nombre').notNullable();
                    productosTable.string('descripcion').notNullable();
                    productosTable.string('codigo').notNullable();
                    productosTable.string('foto');
                    productosTable.decimal('precio', 5, 2);
                    productosTable.integer('stock').notNullable();
                })
                    .then(() => console.log("DONE"));
                const productosList = [
                    {
                        nombre: "PRODUCTO 1",
                        descripcion: "descripcion 1",
                        codigo: "ASD123",
                        foto: "URL1",
                        precio: "10.23",
                        stock: 10
                    },
                    {
                        nombre: "PRODUCTO 2",
                        descripcion: "descripcion 2",
                        codigo: "ASD234",
                        foto: "URL2",
                        precio: "10.23",
                        stock: 10
                    },
                    {
                        nombre: "PRODUCTO 3",
                        descripcion: "descripcion 3",
                        codigo: "ASD345",
                        foto: "URL3",
                        precio: "10.23",
                        stock: 10
                    },
                    {
                        nombre: "PRODUCTO 4",
                        descripcion: "descripcion 4",
                        codigo: "ASD456",
                        foto: "URL4",
                        precio: "10.23",
                        stock: 10
                    }
                ];
                exports.sqliteDB('productos').insert(productosList).then(() => {
                    console.log("productos agregados");
                });
            }
        });
        //ProductosDB MySQL_MariaDB
        exports.myMariaDB.schema.hasTable("productos").then((exists) => {
            if (!exists) {
                console.log("No existe la tabla, vamos a crearla");
                exports.myMariaDB.schema.
                    createTable('productos', (productosTable) => {
                    productosTable.increments();
                    productosTable.timestamp('created_at').defaultTo(exports.myMariaDB.fn.now());
                    productosTable.string('nombre').notNullable();
                    productosTable.string('descripcion').notNullable();
                    productosTable.string('codigo').notNullable();
                    productosTable.string('foto');
                    productosTable.decimal('precio', 5, 2);
                    productosTable.integer('stock').notNullable();
                })
                    .then(() => console.log("DONE"));
                const productosList = [
                    {
                        nombre: "PRODUCTO 1",
                        descripcion: "descripcion 1",
                        codigo: "ASD123",
                        foto: "URL1",
                        precio: "10.23",
                        stock: 10
                    },
                    {
                        nombre: "PRODUCTO 2",
                        descripcion: "descripcion 2",
                        codigo: "ASD234",
                        foto: "URL2",
                        precio: "10.23",
                        stock: 10
                    },
                    {
                        nombre: "PRODUCTO 3",
                        descripcion: "descripcion 3",
                        codigo: "ASD345",
                        foto: "URL3",
                        precio: "10.23",
                        stock: 10
                    },
                    {
                        nombre: "PRODUCTO 4",
                        descripcion: "descripcion 4",
                        codigo: "ASD456",
                        foto: "URL4",
                        precio: "10.23",
                        stock: 10
                    }
                ];
                exports.myMariaDB('productos').insert(productosList).then(() => {
                    console.log("productos agregados");
                });
            }
        });
        //Chat MySQL_sqliteDB
        exports.sqliteDB.schema.hasTable("chat").then((exists) => {
            if (!exists) {
                console.log("No existe la tabla, vamos a crearla");
                exports.sqliteDB.schema.
                    createTable('chat', (table) => {
                    table.string('id');
                    table.string('username');
                    table.string('room');
                })
                    .then(() => console.log("DONE"));
            }
        });
    }
}
exports.mysqlDBService = new CreateDB;
