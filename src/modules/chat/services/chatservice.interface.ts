import { ConnectedUser } from "src/modules/user/services/userService.interface";

export interface Room {
  userAId?: Partial<ConnectedUser>;
  userBId?: Partial<ConnectedUser>;
  pKey?: number;
  aKey?: number;
}

export interface Rooms {
  [prop: string]: Room;
}

export interface IChatService {
  rooms: Rooms;
}