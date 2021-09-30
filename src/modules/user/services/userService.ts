import { ConnectedUser, IUserService } from "./userService.interface";
import { logger } from '../../../helpers/logger'

class UserService implements IUserService {// eslint-disable-line
    onlineUsers: ConnectedUser[] = [];

    onUsersUpdateCb: (users: ConnectedUser[]) => void;

    setOnUsersUpdateCb = (cb: (users: ConnectedUser[]) => void) => this.onUsersUpdateCb = cb;

    addNewUser = (user: ConnectedUser) => {
        this.onlineUsers.push(user);
        this.onUsersUpdateCb(this.onlineUsers);
    }

    removeUser = (socketId: string) => {
        this.onlineUsers = this.onlineUsers.filter(user => user.socketId !== socketId);
        this.onUsersUpdateCb(this.onlineUsers);
    }

    async getRandomTest(): Promise<any> {
        try {
            logger.info("success")
            return "it works";
        } catch (error) {
            logger.error(error)
            return error;
        }
    }
}

export default new UserService();