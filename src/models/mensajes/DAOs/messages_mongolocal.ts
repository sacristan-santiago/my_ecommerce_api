import {messagemodel} from "../../../schemas/message";
import {usersmodel} from "../../../schemas/users";
import {Message} from "../messages.interface"
import {normalize, schema} from "normalizr"

interface User {
    uID: number, 
    username: string,
    room: string
}

class UsersPersistencia {
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

    async saveMessage (message: Message){
        let messageToSave = new messagemodel(message);
        let savedMessage = await messageToSave.save();
        return savedMessage;
    }

    async getAllMessages () {
        try {
            const author = new schema.Entity('author', {}, { idAttribute: 'email' });

            const msge = new schema.Entity(
            'message',
            {
                author: author,
            },
            { idAttribute: '_id' }
            );

            const msgesSchema = new schema.Array(msge);
          
            //Si no se hace el map normalizr no le gusta la definicion del esquema
            let messages = (await messagemodel.find()).map((aMsg:any) => ({
                _id: aMsg._id,
                author: aMsg.author,
                text: aMsg.text,
                time: aMsg.time,
            }));
        
            let normalizedMessages = normalize(messages, msgesSchema);
        
            return normalizedMessages;
            } catch (err) {
            console.log('ERROR');
            console.log(err);
            }
      };
    
}

export const usersPersistencia = new UsersPersistencia;