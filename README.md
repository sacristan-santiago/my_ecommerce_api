Guia para usar la API:
-----------------------------------------------------

1. Para cambiar de persistencia ir a "./apis/productos.ts" y modificar la variable
tipoPersistencia segun el enum:

  enum TipoPersistencia {
    Memoria = 'MEM',
    FileSystem = 'FS',
    MYSQL = 'MYSQL',
    SQLITE3 = 'SQLITE3',
    LocalMongo = 'LOCAL-MONGO',
    MongoAtlas = 'MONGO-ATLAS',
    Firebase = 'FIREBASE',
  }

2. Luego de seleccionar la persistencia actuar segun el caso:

  -Memoria: sin pasos adicionales

  -FileSystem: sin pasos adicionales

  -mySQL: crear una base de datos llamada "ecommerce" en localhost

  -SQLITE3: sin pasos adicionales

  -mongo_local: crear un archivo .env en el root con la variable MONGO_LOCAL_DBNAME=nombreDB

  -mongo_altas: crear un archivo .env en el root con las variables MONGO_ATLAS_DBNAME, MONGO_ATLAS_USER, MONGO_ATLAS_PASSWORD, 
  MONGO_ATLAS_CLUSTER y MONGO_ATLAS_DBNAME. Ver envExample

  -firebase: crear un archivo .env en el root con las variables FIREBASE_PRIVATEKEY, FIREBASE_PROJECTID y FIREBASE_CLIENTEMAIL. Ver envExample


#API productos:

  -GET: http://localhost:8080/api/productos/?id
  
  -POST: http://localhost:8080/api/productos
  
  -PUT: http://localhost:8080/api/productos/id
  
  -DELETE: http://localhost:8080/api/productos/id
  
-------------