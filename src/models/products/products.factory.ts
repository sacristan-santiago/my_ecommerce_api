import { ProductosFSDAO } from './DAOs/productos_fs';
import { ProductosMYSQLDAO } from './DAOs/productos_mysql';
import { ProductosSQLITE3DAO } from './DAOs/productos_sqlite3';
import { ProductosLOCALMONGODAO } from "./DAOs/productos_mongolocal";
import { ProductosATLASMONGODAO } from "./DAOs/productos_mongoatlas";
import { ProductosALTASMONGODAO_EXTENDED } from './DAOs/productos_extended';
import { ProductosFIREBASEDAO } from './DAOs/productos_firebaseDB';
import { ProductosMemDAO } from './DAOs/productos_memory';
import { productosmodel } from "../../schemas/productos"


import path from 'path';

export enum TipoPersistencia {
  Memoria = 'MEM',
  FileSystem = 'FS',
  MYSQL = 'MYSQL',
  SQLITE3 = 'SQLITE3',
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
  MongoAtlas_extended = "MONGO-ALTAS-EXTENDED",
  Firebase = 'FIREBASE',
}

export class ProductosFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      case TipoPersistencia.FileSystem:
        console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS FS');
        const filePath = path.resolve(__dirname, './DAOs/productos.json');
        return ProductosFSDAO.getInstance(filePath);

      case TipoPersistencia.MYSQL:
        console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS MYSQL');
        return ProductosMYSQLDAO.getInstance();

      case TipoPersistencia.SQLITE3:
        console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS SQLITE3');
        return ProductosSQLITE3DAO.getInstance();

      case TipoPersistencia.LocalMongo:
        console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS MONGO LOCAL');
        return ProductosLOCALMONGODAO.getInstance();

      case TipoPersistencia.MongoAtlas:
        console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS MONGO ATLAS');
        return ProductosATLASMONGODAO.getInstance();

        case TipoPersistencia.MongoAtlas_extended:
          console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS MONGO ATLAS EXTENDIDA DE BASE_REPOSITORY');
          return ProductosALTASMONGODAO_EXTENDED.getInstance(productosmodel);
      
      case TipoPersistencia.Firebase:
        console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS FIREBASE');
        return ProductosFIREBASEDAO.getInstance();
        
      default:
        console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS MEMORIA');
        return ProductosMemDAO.getInstance();
    }
  }
}
