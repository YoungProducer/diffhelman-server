import express, { Application } from 'express';
import cors from 'cors';
import { Server as HTTPServer } from 'http';
import { Server as SockServer } from 'socket.io';
import { ServerInterface } from './app.interface';
import baseRouter from '../modules/baseRouter'
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

class Server implements ServerInterface {// eslint-disable-line
  public app!: Application;
  public io!: SockServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;
  public httpServer!: HTTPServer;

  async server(): Promise<void> {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
    }));
    app.use('/api/v1', baseRouter.routes);//setting up base route
    // define a route handler for the default home page
    app.get("/", (req, res) => {
      res.send("Welcome to express-create application! ");
    });

    this.httpServer = new HTTPServer(app);

    this.io = new SockServer(this.httpServer);
    this.app = app;
  }
}

export default new Server();
