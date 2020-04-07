
import * as express                                     from 'express';
import * as bodyParser                                  from 'body-parser';
import mongoose =                         require("mongoose");
// import * as cookieParser                  from 'cookie-parser';
import * as auth                               from './auth/auth'
import * as cors from "cors";

import * as path                          from 'path';
import UserRouter from './controllers/user'
import  DeviceRouter  from './controllers/devices';

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;
  
    //Run configuration methods on the Express instance.
    constructor() {
      this.express = express();
      this.middleware();
      this.config();
      this.routes();
    }
  
    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    public config() {
  
  
      //add static paths
      this.express.use(express.static(path.join(__dirname, "public")));
      this.express.use(auth.initialize())
      //use q promises
      global.Promise = require("q").Promise;
      mongoose.Promise = global.Promise;
  
      // catch 404 and forward to error handler
      this.express.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
          err.status = 404;
          next(err);
      });
  
    }
  
  
    // Configure Express middleware.
    private middleware(): void {
      //options for cors midddleware
      const options:cors.CorsOptions = {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        preflightContinue: false
      };
      //mount logger
        
      //use cors middleware
      this.express.use(cors(options));

      //mount json form parser
      this.express.use(bodyParser.json());
  
      //mount query string parser
      this.express.use(bodyParser.urlencoded({ extended: true }));
  
      //mount cookie parker
      // this.express.use(cookieParser("SECRET_GOES_HERE"));

      //mount override
  //    this.express.use(methodOverride());    
    }
  
    // Configure API endpoints.
    private routes(): void {
      let router = express.Router();
      // placeholder route handler
      this.express.use('/', router);
      this.express.use('/api/v1/user', UserRouter);
      this.express.use('/api/v1/', DeviceRouter);
      // All the routes below require authorization
    }
    
  }
  export default new App().express;
  