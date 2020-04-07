import {Router, Request, Response, NextFunction} from 'express';
import {IDevice} from "../Models/interface/user"
import devicesBusinessLogic from "../businessLogic/devicesBusinessLogic"
import Utils                                     from "../helpers/utils";

export class DeviceRouter{
    router: Router
     /**
     * Initialize the MediBox router
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    public addDevice =async(req:Request, res:Response, next : NextFunction)=>{
        try {
            let deviceObj : IDevice = <IDevice>req.body;
            let deviceBL              = new devicesBusinessLogic();
            let result = await deviceBL.addDevice(deviceObj);
            console.log(result)
            if(!result){
                res.status(200)
                res.send(await  Utils.sendResponse(res, 400, "Error in adding device","data", {"status":false, "error":"Error in adding device"}) )
            }else{
                res.status(200)
                res.send(await  Utils.sendResponse(res, 200, "Device Successfully added", "data", {"status":true, "message":"Device Successfully added"}))
            }
        } catch (error) {
            res.status(200)
            res.send(await Utils.sendResponse(res,400, error, 'data', {"status":false, "error":error}))
        }
    }
    public updateStatus = async(req:Request, res:Response, next : NextFunction)=>{
        try {
            let updateStatusObj : IDevice = <IDevice>req.body;
            let userBL              = new devicesBusinessLogic();
            let result = await userBL.updateStatus(updateStatusObj)
            if(!result){
                res.status(200)
                res.send(await  Utils.sendResponse(res, 400, "Error in updating Devices","data", {"status":false, "error":"Error in updating Devices"}) )
            }else{
                res.status(200)
                res.send(await  Utils.sendResponse(res, 200, "Successfully updated device", "data", {"status":true, "message":"Successfully updated device"}))
            }
        } catch (error) {
            res.status(200)
            res.send(await Utils.sendResponse(res,400, error, 'data', {"status":false, "error":error}))
        }
        
    }
    public deleteDevice = async(req:Request, res:Response, next : NextFunction)=>{
        try {
            let updateStatusObj : IDevice = <IDevice>req.body;
            let userBL              = new devicesBusinessLogic();
            console.log("upda///////////", updateStatusObj)
            await userBL.deleteStatus(updateStatusObj._id);
            res.status(200)
            res.send(await  Utils.sendResponse(res, 200, " Successfully Deleted Device", "data",{"status":true, "message":"Successfully Deleted Device"}))
        } catch (error) {
            res.status(200)
            res.send(await Utils.sendResponse(res,400, error, 'data', {"status":false, "error":error}))
        }
       
    }
    public getDeviceDetails = async(req:Request, res:Response, next : NextFunction)=>{
        try {
            let updateStatusObj : IDevice = <IDevice>req.body;
            let userBL              = new devicesBusinessLogic();
            let devices = await userBL.getDevice(updateStatusObj.created_by);
            res.status(200)
            res.send(await  Utils.sendResponse(res, 200, "Successfully Fetched Device Details", "data",{status : true, "message":"Successfully Fetched Device Details", devices}))
        } catch (error) {
            let s= await Utils.sendResponse(res,400, error, 'data', null);
            res.status(400)
            res.send(s)
        }
       
    }
    // -----------------------------------------------------------------------------------------------------------------------------
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init()
    {
        this.router.post('/device', this.addDevice);
        this.router.put('/device', this.updateStatus);
        this.router.put('/deleteDevices', this.deleteDevice);
        this.router.post('/getDevices', this.getDeviceDetails);
    }
}

// Create the DeviceRouter, and export its configured Express.Router
const deviceRoutes = new DeviceRouter();
deviceRoutes.init();

export default deviceRoutes.router;            
