import { sqliteDB } from "../services/mysqlDB";

interface User {
    id: number, 
    username: string,
    room: string
}

class UsersPersistencia{
    async userJoin (id: string, username: string, room: string): Promise<any> {
        try {
            const user = {id, username, room};
            await sqliteDB.from("chat").insert(user);
            return sqliteDB.from("chat").where({id: id}).select()
        }
        catch (e) {
            console.log(e)
        }
    }

    async getCurrentUser(id: any): Promise<any> {
        try {
            return sqliteDB.from("chat").where({id: id}).select()
        } catch (e) {
            console.log(e);
        }
    }

    async getRoomUser(room: any) {
        try {
                return sqliteDB.from("chat").where({room: room}).select()
        } catch (e) {
            console.log(e);
        }
    }

    async userLeave(id: any) {
        try {
            const leavingUser = await sqliteDB.from("chat").where({id: id}).select()
            await sqliteDB.from("chat").where({id: id}).del();
            return leavingUser[0];
        } catch (e) {
            console.log(e)
        }
    }
}

export const userPersistencia = new UsersPersistencia