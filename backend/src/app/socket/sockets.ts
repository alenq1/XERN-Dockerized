import express from 'express';
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import * as socketIO from 'socket.io'
import {createServer, Server} from 'http'
import {newJobs} from '../helpers/queuelist'

const wsapp = express()
wsapp.use(morgan('short'));
wsapp.use(cors())
wsapp.options('*', cors())

const wshttp = new Server(wsapp)
export const io = socketIO.listen(wshttp);

//socket.of('/ws')
//console.log(typeof(io), "SOCKET ")

io.on('connection', socket => {
    console.log("Socket Connected")
    socket.on('sendMessage', message =>  { 
        //console.log(message, "FROM CLIENT") 
        socket.emit('showMessage', {name: 'USER', message: 'Receiving PONG'})})
        //io.broadcast.emit('showMessage', { name: 'USER', message: 'Receiving PONG' })

        newJobs.Weather.queue.on('global:completed', (job, result) => {
  
            //console.log(`Job completed with resultttttttttttttttttttt ${result}`);
            //console.log(job, "Job completed state");
            socket.broadcast.emit('jobMessage', {name: 'USER', message: JSON.parse(result)},
            //console.log(result, "Weather socket sended")
            )
          })
        
          newJobs.TestJob.queue.on('global:completed', (job, result) => {
  
            //console.log(`Job completed with result ${result}`);
            //console.log(job, "Job completed state");
            socket.emit('otherjobMessage', {name: 'USER', message: JSON.parse(result)},
            //console.log(result, "Scrap socket sended")
            )
          })

    socket.on("disconnect", ()=>{
       console.log("Websocket Disconnected")})

  })
    
export default wshttp