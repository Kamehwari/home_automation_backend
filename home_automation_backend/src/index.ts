import App from './App';
import * as mongoose from 'mongoose';
import * as http from 'http';

const hostname                                          = process.env.HOSTNAME;
const port                                              = process.env.PORT;

const server = http.createServer(App);
console.log("inside index")
module.exports = server.listen(port,function(){
    console.log('server listening at the port : ' + port);
  });

  

mongoose.connection.on('error',function (mongoError) {
  console.log(new Date() +' @ MongoDB: ERROR connecting to');
});

mongoose.connection.on('close',function () {
  console.log(new Date() +' @ MongoDB: Connection Closed');
});

mongoose.connect('mongodb://localhost:27017/home_automation',{useMongoClient : true});