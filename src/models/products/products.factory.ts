import { ProductosFSDAO } from './DAOs/productos_fs';
import { ProductosMYSQLDAO } from './DAOs/productos_mysql';
import { ProductosSQLITE3DAO } from './DAOs/productos_sqlite3';
import { ProductosLOCALMONGODAO } from "./DAOs/productos_mongolocal";
import { ProductosATLASMONGODAO } from "./DAOs/productos_mongoatlas";
import { ProductosFIREBASEDAO } from './DAOs/productos_firebaseDB';
import { ProductosMemDAO } from './DAOs/productos_memory';


import path from 'path';

export enum TipoPersistencia {
  Memoria = 'MEM',
  FileSystem = 'FS',
  MYSQL = 'MYSQL',
  SQLITE3 = 'SQLITE3',
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
  Firebase = 'FIREBASE',
}

export class ProductosFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      case TipoPersistencia.FileSystem:
        console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS FS');
        const filePath = path.resolve(__dirname, './DAOs/productos.json');
        return new ProductosFSDAO(filePath);

      case TipoPersistencia.MYSQL:
        console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS MYSQL');
        return new ProductosMYSQLDAO;

      case TipoPersistencia.SQLITE3:
        console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS SQLITE3');
        return new ProductosSQLITE3DAO;

      case TipoPersistencia.LocalMongo:
        console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS MONGO LOCAL');
        return new ProductosLOCALMONGODAO;

      case TipoPersistencia.MongoAtlas:
        console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS MONGO ATLAS');
        return new ProductosATLASMONGODAO;
      
      case TipoPersistencia.Firebase:
        console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS FIREBASE');
        return new ProductosFIREBASEDAO;
        
      default:
        console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS MEMORIA');
        return new ProductosMemDAO();
    }
  }
}
