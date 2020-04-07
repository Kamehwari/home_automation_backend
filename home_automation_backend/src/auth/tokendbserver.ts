
import * as jwt from 'jwt-simple'
import {ITokenDetails} from "../Models/db/Token"
import { TokenSchema } from '../Models/db/Token'

import * as mongoose from 'mongoose';

// export let setToken = async(encoded : IToken) =>{
//   try {
//     const token = jwt.encode(encoded, process.env.SECRET_KEY);
//     return token;
//   } catch (error) {
    
//   }
// }

// export let authorization = async(authToken : string)=>{
//   try {
//     const decoded = await jwt.decode(authToken, process.env.SECRET_KEY)
//     return decoded;
//   } catch (error) {
//     throw error;
//   }
// }



let connection: mongoose.Connection = mongoose.createConnection('mongodb://localhost:27017/home_automation');

// export let createToken = (user: string,businessId: string, callback:(err: string | null , result: string | null) => any) => {
//           let tokenDetailSchema = connection.model<ITokenDetails>('token', TokenSchema);
//           tokenDetailSchema.findOne({'user':user},function(err : Error ,result : any){
//           if(!result){
//             let tokenDetail  = <ITokenDetails>{
//               user:user,
//               token:jwt.encode({user:user,businessId:businessId}, Config.getInstance().JwtParams.secret),
//               status:'VALID',
//               businessId:businessId
//             };
//              tokenDetailSchema.create(tokenDetail,function(err:any,result:any){
//               console.log(`Token saved in DB successfully for user [${user}].`)
//               callback(null,tokenDetail.token)
//             })
//           }else{
//             console.log(`Token already exist for user [${user}]`)
//             callback(`Token already exist for user [${user}]. Please contact helpdesk to retreive your token.`,null)
//           }
//         });
// }

export let getToken = (user: string , callback: (err: string | null , reult: any | null ) => any) => {
   let tokenDetailSchema = connection.model<ITokenDetails>('token', TokenSchema);
   tokenDetailSchema.findOne({'user':user},function(err : Error ,result : any){
     if(result){
     console.log(`Got token ${result.token} for User : ${user}`);
     callback(null,result)

   }else{
   callback(`No token found for user [${user}]`,null);
   }
   });

}
