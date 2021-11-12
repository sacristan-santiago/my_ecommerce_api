import { NewUserI, UserI, UserQuery } from '../models/usuarios/usuarios.interface';
import { UsuariosFactoryDAO } from '../models/usuarios/usuarios.factory';
import { tipoPersistencia } from './productos';
import { carritoAPI } from "./carrito"

class UsuariosAPI {
    private usuarios: any;
  
    constructor() {
      this.usuarios = UsuariosFactoryDAO.get(tipoPersistencia);
    }
  
    async getUsers(id?: string): Promise<UserI[]> {
        if (id) return this.usuarios.get(id);
    
        return this.usuarios.get();
      }
    
    async addUser(userData: NewUserI): Promise<UserI> {
      const newUser = await this.usuarios.add(userData);
      await carritoAPI.createCart(newUser._id);
      return newUser;
    }
  
    async updateUser(id: string, userData: NewUserI) {
      const updatedUser = await this.usuarios.update(id, userData);
      return updatedUser;
    }
  
    async deleteUser(id: string) {
      await this.usuarios.delete(id);
      //Borrar carrito tambien
    }
  
    async query(username?: string, email?: string): Promise<UserI> {
      const query = {
        $or: [] as UserQuery[],
      };
  
      if (username) query.$or.push({ username });
  
      if (email) query.$or.push({ email });
  
      return this.usuarios.query(query);
    }

    async updatePhoto(id: string, photoId: string) {
      await this.usuarios.updatePhoto(id, photoId)
    }

  }
  
  export const usuariosAPI = new UsuariosAPI();