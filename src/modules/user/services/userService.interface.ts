export interface ConnectedUser {
    socketId: string;
    username: string;
}

export interface IUserService{
    onlineUsers: ConnectedUser[];

    getRandomTest(): Promise<any>;
}