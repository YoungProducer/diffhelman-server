import { Request, Response, Router } from 'express';
import chatService from '../chat/services/chatService';
import { IRouter } from '../router.interface';
import userService from './services/userService'
const router = Router();

class UserRouter implements IRouter{// eslint-disable-line
    get routes(){
        router.get('/', async (req: Request, res: Response) => {
            // eslint-disable-next-line no-useless-catch
            try {
                const quote = await userService.getRandomTest();
                return res.send(quote);
            } catch (err) {
                throw err;
            }
        });

        router.post('/connect', async (req: Request, res: Response) => {
            const username = req.body.username;

            userService.addNewUser(username);

            res.send({});
        });

        router.post('/send-request', async (req: Request, res: Response) => {
            const target = req.body.target;
            const initializer = req.body.initializer;

            chatService.createNewRoom(initializer, target);

            res.send({});
        });

        return router;
    }
}

export default new UserRouter();