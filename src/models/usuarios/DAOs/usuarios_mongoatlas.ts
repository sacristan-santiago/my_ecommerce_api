import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { NewUserI, UserI, UserBaseClass, UserQuery } from '../usuarios.interface';
import { UsuarioSchema, UsuarioModel } from "../../../schemas/usuario"
import Config from '../../../config';

export class UsuariosATLASMONGODAO implements UserBaseClass {
  
  async get(id?: string): Promise<UserI[]> {
    let output: UserI[] = [];
    try {
      if (id) {
        const document = await UsuarioModel.findById(id);
        if (document) output.push(document);
      } else {
        output = await UsuarioModel.find();
      }

      return output;
    } catch (err) {
      return output;
    }
  }

  async add(data: NewUserI): Promise<UserI> {
    const newProduct = new UsuarioModel(data);
    await newProduct.save();

    return newProduct;
  }

  async update(id: string, data: NewUserI): Promise<UserI | null>  {
    return UsuarioModel.findByIdAndUpdate(id, data);
  }

  async delete(id: string) {
    await UsuarioModel.findByIdAndDelete(id);
  }

  async query(query: any): Promise<UserI> {
    const result = await UsuarioModel.find(query);
    return result[0];
  }

  async updatePhoto(id: string, photoId: string) {
    try {
      console.log(`llego, userId: ${id}, photoId: ${photoId}`)  
      const user = await UsuarioModel.findById(id);
      user.photoId = photoId
      console.log(`nuevo user: ${user}`)
      await UsuarioModel.findByIdAndUpdate(id, user)
    } catch (err) {
      console.log(err)
    }
  }

  async validateUserPassword(
    username: string,
    password: string
  ): Promise<boolean> {
    const user = await UsuarioModel.findOne({ username });

    if (!user) return false;

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) return false;
    return true;
  }
}