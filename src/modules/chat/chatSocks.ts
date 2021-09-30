import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import chatService from "./services/chatService";

export class ChatSocks {
  constructor(socket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) {
    socket.on('connection', (socket) => console.log(socket.id));

    chatService.setOnRoomCreateCallback((room) => {
    })
  }
}