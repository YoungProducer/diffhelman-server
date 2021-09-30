export interface Room {
  userAId?: string;
  userBId?: string;
}

export interface Rooms {
  [prop: string]: Room;
}

export interface IChatService {
  rooms: Rooms;
}