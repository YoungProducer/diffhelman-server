import { Request, Response, Router } from 'express';
import { IRouter } from '../router.interface';
const router = Router();

class UserRouter implements IRouter{// eslint-disable-line
    get routes(){
        router.get('/', async (req: Request, res: Response) => {
            // eslint-disable-next-line no-useless-catch
            try {
                return res.send();
            } catch (err) {
                throw err;
            }
        });
        return router;
    }
}

export default new UserRouter();