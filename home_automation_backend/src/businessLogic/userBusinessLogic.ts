import {IRegister, ILogin, ILogout} from "../Models/interface/user"
import {IUserDetails} from "../Models/db/User"
import { UserSchema } from '../Models/db/User'
import * as hash from 'bcryptjs';
import * as mongoose from 'mongoose';
let connection: mongoose.Connection = mongoose.createConnection("mongodb://localhost:27017/home_automation");

class UserBusinessLogic {
    async userRegistration(registrationObject:IRegister):Promise<any>{
        try {
            if(!registrationObject.email || !registrationObject.first_name || !registrationObject.password){
                throw "Email/FirstName/Password is mandatory"
            }
            let userSchema = connection.model<IUserDetails>('user', UserSchema);
            let result = await userSchema.findOne({"email":registrationObject.email})
            if(!result){
                let salt = await hash.genSalt(15)
                registrationObject.password = await hash.hash(registrationObject.password, salt)
                userSchema.insertMany([{"first_name":registrationObject.first_name, "last_name":registrationObject.last_name, "email":registrationObject.email, "password":registrationObject.password}])
                return true;
            }else{
                return false;
            }
        } catch (error) {
            throw error;
        }
    }
    async userLogin(loginObject:ILogin):Promise<any>{
        try {
            console.log("////////////")
            if(!loginObject.email || !loginObject.password){
                console.log("inside if")
                throw "Email/FirstName/Password is mandatory"
            }
            let userSchema = connection.model<IUserDetails>('user', UserSchema);
            let result = await  userSchema.findOne({"email":loginObject.email})
            console.log(result)
            if(!result){
                return false
            }else{
                return result;
            } 
        } catch (error) {
            throw error;
        }
    }
    async userLogout(registratonObject:ILogout){
        try {
            
        } catch (error) {
            throw error;
        }
    }
}



Object.seal(UserBusinessLogic);
export default UserBusinessLogic;
