import {usersmodel} from "../models/users";

interface User {
    uID: number, 
    username: string,
    room: string
}

class ProductosPersistencia {
    async userJoin (id: string, username: string, room: string): Promise<any> {
        try {
            const user = {uID: id, username, room};
            const userSaveModel = new usersmodel(user);
            await userSaveModel.save();
            
            return usersmodel.find({uID: id})
        }
        catch (e) {
            console.log(e)
        }
    }

    async getCurrentUser(id: any): Promise<any> {
        try {
            return usersmodel.find({uID: id})
        } catch (e) {
            console.log(e);
        }
    }

    async getRoomUser(room: string): Promise<any> {
        try {
            return usersmodel.find({room: room})
        } catch (e) {
            console.log(e);
        }
    }

    async userLeave(id: any) {
        try {
            const leavingUser = await usersmodel.find({uID: id})
            await usersmodel.deleteOne({uID: id});
            return leavingUser[0];
        } catch (e) {
            console.log(e)
        }
    }

    async saveMessage (id: string, message: string){
        const user:any = await usersmodel.findOne({uID: id})
        user.messages.push(message);
        await usersmodel.findOneAndUpdate({uID: id}, { $set: { messages: user.messages }})
    }
    
}

export const usersPersistencia = new ProductosPersistencia;