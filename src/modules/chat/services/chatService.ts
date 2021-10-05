import { getRandomInt } from "../../../helpers/fermat";
import { generatePublicKey } from "../../../helpers/generatePublicKey";
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

  generateKeys = (roomId: string) => {
    const p = generatePublicKey(5000, 10000);
    const a = getRandomInt(50, 100);

    this.rooms[roomId].pKey = p;
    this.rooms[roomId].aKey = a;

    return { p, a };
  }

  getOpositeUser = (roomId: string, initiatorSockId: string) => {
    const room = this.rooms[roomId];

    if (room.userAId.socketId === initiatorSockId) return room.userBId;
    if (room.userBId.socketId === initiatorSockId) return room.userAId;

    return undefined;
}
}

export default new ChatService();