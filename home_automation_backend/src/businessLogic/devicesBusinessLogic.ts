import {IDevice} from "../Models/interface/user"
import {IDeviceDetails} from "../Models/db/Devices"
import { DeviceSchema } from '../Models/db/Devices'
import {IUserDetails} from "../Models/db/User"
import { UserSchema } from '../Models/db/User'

import * as mongoose from 'mongoose';
let connection: mongoose.Connection = mongoose.createConnection("mongodb://localhost:27017/home_automation");

class DeviceBusinessLogic {
    async addDevice(deviceObject:IDevice):Promise<any>{
        try {
            if(!deviceObject.name || !deviceObject.state || !deviceObject.created_by){
                throw "Device Name /Status is mandatory"
            }
            let userSchema = connection.model<IUserDetails>('user', UserSchema);
            let userDetails = await userSchema.findOne({"email":deviceObject.created_by})
            let deviceSchema = connection.model<IDeviceDetails>('device', DeviceSchema);
            if(userDetails){
                await deviceSchema.insertMany([{"name":deviceObject.name, "state":deviceObject.state, "created_by":userDetails._id}]);
                return true;  
            }else return false;
        } catch (error) {
            throw error;
        }
    }
    async updateStatus(deviceObject:IDevice):Promise<any>{
        try {
            if(!deviceObject.state){
                throw "Status is mandatory"
            }
            let deviceSchema = connection.model<IDeviceDetails>('device', DeviceSchema);
            await deviceSchema.updateOne({"_id":mongoose.Types.ObjectId(deviceObject._id)}, {"state":deviceObject.state})
            return true
        } catch (error) {
            throw error;
        }
    }
    async deleteStatus(deviceId:string):Promise<any>{
        try {
            if(!deviceId){
                throw "Device ID is mandatory"
            }
            let deviceSchema = connection.model<IDeviceDetails>('device', DeviceSchema);
            await deviceSchema.findByIdAndRemove({"_id":mongoose.Types.ObjectId(deviceId)})
            return true
        } catch (error) {
            throw error;
        }
    }
    async getDevice(email:any):Promise<any>{
        try {
          
            let userSchema = connection.model<IUserDetails>('user', UserSchema);
            let userDetails = await userSchema.findOne({"email":email})
            let deviceSchema = connection.model<IDeviceDetails>('device', DeviceSchema);
            if(userDetails){
                let deviceDetails = await deviceSchema.find({created_by: userDetails._id})
                console.log(deviceDetails)
                return deviceDetails
            }else return false;
        } catch (error) {
            throw error;
        }
    }
}



Object.seal(DeviceBusinessLogic);
export default DeviceBusinessLogic;
