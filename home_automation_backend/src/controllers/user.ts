import {Router, Request, Response, NextFunction} from 'express';
import {IRegister, ILogin, ILogout} from "../Models/interface/user"
import UserBusinessLogic from "../businessLogic/userBusinessLogic"
import Utils                                     from "../helpers/utils";

export class UserRouter{
    router: Router
     /**
     * Initialize the MediBox router
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    public register =async(req:Request, res:Response, next : NextFunction)=>{
        try {
            console.log("inside register------------------")
            let registerObj : IRegister = <IRegister>req.body;
            let userBL              = new UserBusinessLogic();
            let result = await userBL.userRegistration(registerObj);
            console.log(result)
            if(!result){
                res.status(200)
                res.send(await  Utils.sendResponse(res, 400, "Enter Email is Already Registered","data", null) )
            }else{
                res.status(200)
                res.send(await  Utils.sendResponse(res, 200, "User Successfully Registered", "data", result))
            }
            
        } catch (error) {
            let s= await Utils.sendResponse(res,400, error, 'data', null);
            res.status(400)
            res.send(s)
        }
    }
    public login = async(req:Request, res:Response, next : NextFunction)=>{
        try {
            let loginObj : ILogin = <ILogin>req.body;
            let userBL              = new UserBusinessLogic();
            console.log("inside login")
            let result = await userBL.userLogin(loginObj)
            if(!result){
                res.status(200)
                res.send(await  Utils.sendResponse(res, 400, "Enter Email/Password is incorrect","data", {"status":false, "error":"Entered Email/Password is incorrect"}) )
            }else{
                console.log("inside else")
                res.status(200)
                res.send(await Utils.sendResponse(res, 200, "User Successfully Logged-In", "data", {"status":true, "message":"User Successfully Logged-In", "data":result}))
            }
            
        } catch (error) {
            res.status(200)
            res.send(await Utils.sendResponse(res,200, error, 'data', {"status":false, "error":error}))
        }
        
    }
    public logout(req:Request, res:Response, next : NextFunction){
        let logoutObj : ILogout = <ILogout>req.body;
    }
    // -----------------------------------------------------------------------------------------------------------------------------
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init()
    {
        this.router.post('/register', this.register);
        this.router.put('/login', this.login);
        this.router.put('/logout', this.logout);
    }
}

// Create the UserRouter, and export its configured Express.Router
const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;            
