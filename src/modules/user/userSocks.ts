import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import userService from "./services/userService";
import chatService from '../chat/services/chatService'

interface ConnectToChatServicePayload {
  username: string;
}

interface InviteUserPayload {
  username: string;
}

interface AcceptInvitePayload {
  roomId: string;
}

export class UserSocks {
  instance: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;

  constructor(socket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) {
    this.instance = socket;
    userService.setOnUsersUpdateCb((users) => {
      console.log('emitting')
      this.instance.emit('user-list', { users });
    });

    this.socketEvents();
  }

  socketEvents = () => {
    this.instance.on('connection', (socket) => {
      socket.on('connect-to-chat-service', ({ username }: ConnectToChatServicePayload) => {
        console.log('connect-to-chat-service');
        userService.addNewUser({
          username,
          socketId: socket.id
        });

        console.log('sending users list', userService.onlineUsers)
        this.instance.emit('user-list', { users: userService.onlineUsers })

        this.instance.to(socket.id).emit('connected-to-chat-service');
      });

      socket.on('invite-user', ({ username }: InviteUserPayload) => {
        const invitedUser = userService.getUserByName(username);

        if (!invitedUser) return;

        const currentUser = userService.getUserBySockId(socket.id);

        const roomId = chatService.createNewRoom(currentUser);

        socket.join(roomId);

        this.instance.to(invitedUser.socketId).emit('recive-invite', { roomId, username: currentUser.username });
      })

      socket.on('accept-invite', ({ roomId }: AcceptInvitePayload) => {
        const invitedUser = userService.getUserBySockId(socket.id);

        chatService.connectToRoom(roomId, invitedUser);

        socket.join(roomId);

        this.instance.to(roomId).emit('invite-accepted', { message: 'Connection established' });
      })
    });
  }
}