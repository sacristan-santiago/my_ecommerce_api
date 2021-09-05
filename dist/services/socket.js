"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketService = void 0;
const socket_io_1 = require("socket.io");
const messages_1 = require("../utils/messages");
const users_1 = require("../persistencia/users");
// //usando socket.io
// const myWSServer =  new Server(myServer);
class SocketServer {
    initWsService(server) {
        if (!this.myWSServer) {
            this.myWSServer = new socket_io_1.Server(server);
            this.myWSServer.on("connection", (socket) => {
                console.log("Un cliente se ha conectado");
                socket.on("joinRoom", ({ username, room }) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        let user = yield users_1.usersPersistencia.userJoin(socket.id, username, room);
                        const botName = "SantiBot";
                        user = user[0];
                        socket.join(user.room);
                        //Mensaje de bienvenida
                        socket.emit("message", messages_1.formatMessage(botName, "Bienvenido a SantiChat!"));
                        //Broadcast cuando se conecta un usuario
                        socket.broadcast.to(user.room).emit("message", messages_1.formatMessage(botName, `${user.username} se ha conectado`));
                        //Mandar usuarios y room info
                        this.myWSServer.to(user.room).emit("roomUsers", {
                            room: user.room,
                            users: yield users_1.usersPersistencia.getRoomUser(user.room),
                        });
                        //Escuchar mensajes en el chat
                        socket.on("chatMessage", (msg) => __awaiter(this, void 0, void 0, function* () {
                            let user = yield users_1.usersPersistencia.getCurrentUser(socket.id).catch((e) => console.log(e));
                            user = user[0];
                            this.myWSServer.to(user.room).emit("message", messages_1.formatMessage(user.username, msg));
                        }));
                        //Run cuando un cliente se desconecta
                        socket.on("disconnect", () => __awaiter(this, void 0, void 0, function* () {
                            const user = yield users_1.usersPersistencia.userLeave(socket.id).catch((e) => console.log(e));
                            if (user) {
                                this.myWSServer.to(user.room).emit("message", messages_1.formatMessage(botName, `${user.username} ha abandonado el chat`));
                                //Mandar usuarios y room info
                                this.myWSServer.to(user.room).emit("roomUsers", {
                                    room: user.room,
                                    users: yield users_1.usersPersistencia.getRoomUser(user.room)
                                });
                            }
                        }));
                    }
                    catch (e) {
                        console.log(e);
                    }
                }));
            });
        }
        return this.myWSServer;
    }
}
exports.socketService = new SocketServer();
