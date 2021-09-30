import { guidGenerator } from "src/helpers/guid";
import { IChatService, Room, Rooms } from "./chatservice.interface";

export class ChatService implements IChatService {
  rooms!: Rooms;
  onRoomCreateCallback!: (room: Room) => void;

  constructor() {
    this.rooms = {};
  }

  setOnRoomCreateCallback = (cb: (room: Room) => void) => this.onRoomCreateCallback = cb;

  createNewRoom = (initializer: string, target: string) => {
    const roomId = guidGenerator();

    this.rooms[roomId] = {
      userAId: initializer,
      userBId: target,
    }

    this.onRoomCreateCallback(this.rooms[roomId]);
  }
}

export default new ChatService();