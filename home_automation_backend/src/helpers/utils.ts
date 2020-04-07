import { Request, Response, NextFunction} from 'express';

export class Utils {
    public static sendResponse =(res : Response, code : number, msg : string, objectKey : string , objectValue : any)=>{
        console.log("object value---------", objectValue)
        let respon = {
            code           :    code,
            message        :    msg,  
            [objectKey]    :    objectValue
        } 
        console.log("res", respon)
        return respon;
    }
}
export default Utils