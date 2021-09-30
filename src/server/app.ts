import express, { Application } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SockServer } from 'socket.io';
import { ServerInterface } from './app.interface';
import baseRouter from '../modules/baseRouter'
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

class Server implements ServerInterface {// eslint-disable-line
  public app!: Application;
  public io!: SockServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;

  async server(): Promise<void> {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api/v1', baseRouter.routes);//setting up base route
    // define a route handler for the default home page
    app.get("/", (req, res) => {
      res.send("Welcome to express-create application! ");
    });
    app.use(cors());

    const httpServer = createServer(app);

    this.io = new SockServer(httpServer);
    this.app = app;
  }
}

export default new Server();
