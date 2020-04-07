
'use strict';

import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

export interface IUserDetails extends mongoose.Document {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }
// Schema
export let UserSchema = new Schema({
    first_name : {type : String, require : true},
    last_name : {type : String},
    email : {type : String, require : true},
    password : {type : String, require : true},
    is_loggedin : {type : Boolean, default : false},
    created_at : {type : Date, default : new Date()}
})


