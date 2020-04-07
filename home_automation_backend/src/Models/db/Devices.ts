
'use strict';

import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

export interface IDeviceDetails extends mongoose.Document {
    name: string;
    state: string;
    created_by: string;
    created_at: string;
  }
// Schema
export let DeviceSchema = new Schema({
    name : {type : String, require: true },
    state : {type : String, require : true, default : "off"},
    created_by : {type :  mongoose.Schema.Types.ObjectId, ref : 'User' },
    created_at : {type : Date, default : new Date()}
})


