import { Schema } from "mongoose"

export interface NewUserI {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    phoneNumber: string;
  }

  export interface UserI {
    _id: string;
    photoId: Schema.Types.ObjectId | string | undefined;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    phoneNumber: string;
  }
  
  export interface UserQuery {
    username?: string;
    email?: string;
  }
  
  export interface UserBaseClass {
    get(id?: string | undefined): Promise<UserI[]>;
    add(data: NewUserI): Promise<UserI>;
    update(id: string, newProductData: NewUserI): Promise<UserI | null>;
    delete(id: string): Promise<void>;
  }
  