import app from './settings/app'
//const app = require('./app')
import config from './settings/config'
//const {ports} = require('./config')

//const pp = 0
app.listen(config.ports.serverPort, (err) =>
  {
  if(err){
    console.log(err)
    process.exit(1);
    return;
  }  
    console.log(`Example app listening on port ${config.ports.serverPort}!`)
  
  }
);

//module.exports = app