import knex from "knex";
import { carritoAPI } from "../apis/carrito";

export const sqliteDB = knex({
    client: 'sqlite3',
    connection: { filename: './mydb.sqlite' },
  });

export const myMariaDB = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'ecommerce'
  },
  pool: { min: 0, max: 7 }
})

class CreateDB {
  init() {
    //ProductosDB MySQL_sqliteDB
    sqliteDB.schema.hasTable("productos").then((exists)=>{
      if (!exists) {
        console.log("No existe la tabla, vamos a crearla")
        sqliteDB.schema.
          createTable('productos', (productosTable) => {
            productosTable.increments();
            productosTable.timestamp('timestamp').defaultTo(myMariaDB.fn.now());
            productosTable.string('nombre').notNullable();
            productosTable.string('descripcion').notNullable();
            productosTable.string('codigo').notNullable();
            productosTable.string('foto');
            productosTable.decimal('precio', 5, 2);
            productosTable.integer('stock').notNullable();
          })
          .then(() => console.log("DONE"))

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
          ]

          sqliteDB('productos').insert(productosList).then(()=>{
            console.log("productos agregados")
        });
      }
    })

    //CarritoDB MySQL_sqliteDB
    sqliteDB.schema.hasTable("carrito").then((exists)=>{
    if (!exists) {
    console.log("No existe la tabla carrito, vamos a crearla")
    sqliteDB.schema.
      createTable('carrito', (carritoTable) => {
        carritoTable.increments();
        carritoTable.timestamp('timestamp').defaultTo(myMariaDB.fn.now());
        carritoTable.string('nombre').notNullable();
        carritoTable.string('descripcion').notNullable();
        carritoTable.string('codigo').notNullable();
        carritoTable.string('foto');
        carritoTable.decimal('precio', 5, 2);
        carritoTable.integer('stock').notNullable();
      })
      .then(() => console.log("DONE"))

      const mockCarrito = [
        {
            nombre: "PRODUCTO 1",
            descripcion: "descripcion 1",
            codigo: "ASD123",
            foto: "URL1",
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
      ]

    sqliteDB('carrito').insert(mockCarrito).then(()=>{
      console.log("productos carrito agregados")
    });
  }
})
    
    //ProductosDB MySQL_MariaDB
    myMariaDB.schema.hasTable("productos").then((exists)=>{
      if (!exists) {
        console.log("No existe la tabla, vamos a crearla")
        
        myMariaDB.schema.
          createTable('productos', (productosTable) => {
            productosTable.increments();
            productosTable.timestamp('timestamp').defaultTo(myMariaDB.fn.now());
            productosTable.string('nombre').notNullable();
            productosTable.string('descripcion').notNullable();
            productosTable.string('codigo').notNullable();
            productosTable.string('foto');
            productosTable.decimal('precio', 5, 2);
            productosTable.integer('stock').notNullable();
          })
          .then(() => console.log("DONE"))
    
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
        ]
    
        myMariaDB('productos').insert(productosList).then(()=>{
            console.log("productos agregados")
        });
      }
    })

    //CarritoDB MySQL_myMariaDB
    myMariaDB.schema.hasTable("carrito").then((exists)=>{
      if (!exists) {
        console.log("No existe la tabla carrito, vamos a crearla")
        myMariaDB.schema.
          createTable('carrito', (carritoTable) => {
            carritoTable.integer('id').notNullable();
            carritoTable.timestamp('timestamp').defaultTo(myMariaDB.fn.now());
            carritoTable.string('nombre').notNullable();
            carritoTable.string('descripcion').notNullable();
            carritoTable.string('codigo').notNullable();
            carritoTable.string('foto');
            carritoTable.decimal('precio', 5, 2);
            carritoTable.integer('stock').notNullable();
          })
          .then(() => console.log("DONE"))

          const mockCarrito = [
            {
                id: 1,
                nombre: "PRODUCTO 1",
                descripcion: "descripcion 1",
                codigo: "ASD123",
                foto: "URL1",
                precio: "10.23",
                stock: 10
            },
            {
              id: 4,
              nombre: "PRODUCTO 4",
              descripcion: "descripcion 4",
              codigo: "ASD456",
              foto: "URL4",
              precio: "10.23",
              stock: 10
            }
          ]

        myMariaDB('carrito').insert(mockCarrito).then(()=>{
          console.log("productos carrito agregados")
        });
      }
    })

    //Chat MySQL_sqliteDB
    sqliteDB.schema.hasTable("chat").then((exists)=>{
      if (!exists) {
        console.log("No existe la tabla, vamos a crearla")
        sqliteDB.schema.
          createTable('chat', (table) => {
            table.string('id');
            table.string('username');
            table.string('room');
          })
          .then(() => console.log("DONE"))
      }
    })
    
  }
}

export const mysqlDBService = new CreateDB;