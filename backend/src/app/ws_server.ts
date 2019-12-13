import wshttp from './socket/sockets'
//const http = require('./sockets')
import config from './settings/config'
//const config = require('./config')
//To listen to messages


//wire up the server to listen to our port 500
wshttp.listen(config.ports.ws_Port, ()=>{
console.log('socket listen on port: '+ config.ports.ws_Port)
});

//export default 
//module.exports = http
