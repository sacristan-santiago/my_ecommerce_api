import {Server, Socket} from "socket.io";
import {formatMessage} from "../utils/messages";
import { usersPersistencia } from "../models/mensajes/DAOs/messages_mongolocal";
import { Message } from "../models/mensajes/messages.interface";
import util from "util"

// //usando socket.io
// const myWSServer =  new Server(myServer);

class SocketServer {
    myWSServer: any;

    initWsService(server: any) {
        if (!this.myWSServer) {
            this.myWSServer = new Server(server);
            this.myWSServer.on("connection",  (socket: any) => {
            console.log("Un cliente se ha conectado");

            //PRODUCTOS
            // socket.on("new-product", function (data) {
            //     console.log("entro el producto");
            //     productos.push(data);
            //     console.log(productos);
            //     myWSServer.emit("render-product", productos);
            // })

            //MENSAJES  
            //Elegir sala
            interface joinRoom {
                username: string;
                room: string;
            }

            socket.on("joinRoom", async  ({username, room}: joinRoom) => {
                try {
                    let user = await usersPersistencia.userJoin(socket.id, username, room)
                    const botName = "SantiBot";
                    user = user[0];
                    socket.join(user.room);

                    //Traigo mensajes MongolocalDB y emito en DOM
                    let msges = await usersPersistencia.getAllMessages();
                    socket.emit("receiveMessages", msges)

                    //Mensaje de bienvenida
                    socket.emit("message", formatMessage(botName,"Bienvenido a SantiChat!"));
                    
                    //Broadcast cuando se conecta un usuario
                    socket.broadcast.to(user.room).emit("message", formatMessage(botName, `${user.username} se ha conectado`));
                    
                    //Mandar usuarios y room info
                    this.myWSServer.to(user.room).emit("roomUsers", {
                        room: user.room,
                        users: await usersPersistencia.getRoomUser(user.room),
                    })

                    //Escuchar mensajes en el chat
                    socket.on("chatMessage", async (msg: Message) => {
                        await usersPersistencia.saveMessage(msg)

                        this.myWSServer.to(user.room).emit("message", formatMessage(msg.author.email, msg.text));
                    })

                    //Run cuando un cliente se desconecta
                    socket.on("disconnect", async () => {
                        const user: any = await usersPersistencia.userLeave(socket.id).catch((e)=>console.log(e));
                        
                        if (user) {
                            this.myWSServer.to(user.room).emit("message", formatMessage(botName, `${user.username} ha abandonado el chat`));
                            
                            //Mandar usuarios y room info
                            this.myWSServer.to(user.room).emit("roomUsers", {
                                room: user.room,
                                users: await usersPersistencia.getRoomUser(user.room)
                            })
                        }
                    })
                } catch (e) {
                    console.log(e);
                }
            });
            });
        }

        return this.myWSServer;
    }
}

export const socketService = new SocketServer ();