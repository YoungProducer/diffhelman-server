import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import userService from "./services/userService";

export class UserSocks {
  instance: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;

  constructor(socket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) {
    this.instance = socket;
    userService.setOnUsersUpdateCb((users) => {
      console.log(users);
      this.instance.emit('user-list', { users });
    });
  }

  socketEvents = () => {
    this.instance.on('connection', () => {
      return;
    });
  }
}