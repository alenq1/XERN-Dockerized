import wshttp from './socket/sockets'
import config from './settings/config'

//To listen to messages

//wire up the server to listen to our port
wshttp.listen(config.ports.ws_Port, ()=> {
console.log('socket listen on port: '+ config.ports.ws_Port)
});
