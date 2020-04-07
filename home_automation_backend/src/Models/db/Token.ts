import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

export interface ITokenDetails extends mongoose.Document {
  user: string;
  token: string;
  status: string;
  email: string;
}

export let TokenSchema = new Schema({
  user:  {
	   type: String,
	   required: true,
     unique : true
  },
  token:{
    type: String
  },
  status:{
    type: String
  },
  email: {
    type: String
  }
});
