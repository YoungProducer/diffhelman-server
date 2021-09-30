import { guidGenerator } from "../../../helpers/guid";
import { ConnectedUser } from "../../../modules/user/services/userService.interface";
import { IChatService, Room, Rooms } from "./chatservice.interface";

export class ChatService implements IChatService {
  rooms!: Rooms;
  onRoomCreateCallback!: (room: Room) => void;

  constructor() {
    this.rooms = {};
  }

  setOnRoomCreateCallback = (cb: (room: Room) => void) => this.onRoomCreateCallback = cb;

  createNewRoom = (initializer: ConnectedUser) => {
    const roomId = guidGenerator();

    this.rooms[roomId] = {
      userAId: initializer,
      userBId: undefined,
    }

    this.onRoomCreateCallback(this.rooms[roomId]);

    return roomId;
  }

  connectToRoom = (roomId: string, invitedUser: ConnectedUser) => {
    this.rooms[roomId].userBId = invitedUser;
  }
}

export default new ChatService();