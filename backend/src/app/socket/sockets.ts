import express from 'express';
import cors from 'cors'
import morgan from 'morgan'
import * as socketIO from 'socket.io'
import {createServer, Server} from 'http'
import {newJobs} from '../helpers/queuelist'

const wsapp = express()
wsapp.use(morgan('short'));
wsapp.use(cors())
wsapp.options('*', cors())

const wshttp = new Server(wsapp)

//const queue  = require('./tasks')


// require the socket.io module

export const io = socketIO.listen(wshttp);

//socket.of('/ws')
//console.log(typeof(io), "SOCKET ")

io.on('connection', socket => {
    console.log("Connected")
  
    socket.on('sendMessage', message =>  { 
        console.log(message, "FROM CLIENT") 
        io.emit('showMessage', {name: 'USER', message: 'Receiving PONG'})})
        //io.broadcast.emit('showMessage', { name: 'USER', message: 'Receiving PONG' })
   
        newJobs.Weather.queue.on('global:completed', (job, result) => {
  
            //console.log(`Job completed with resultttttttttttttttttttt ${result}`);
            console.log(job, "ESTADO dEL JOB COMPLEATOD");
            io.emit('jobMessage', {name: 'USER', message: JSON.parse(result)},
            console.log("SOCKKKKKKKKKKKKKKKKKKET WHEATTTTTTERRRR ")
            )
          })
        newJobs.TestJob.queue.on('global:completed', (job, result) => {
  
            //console.log(`Job completed with resultttttttttttttttttttt ${result}`);
            console.log(job, "ESTADO dEL JOB COMPLEATOD");
            io.emit('otherjobMessage', {name: 'USER', message: JSON.parse(result)},
            console.log(result, "SOCKKKKKKKKKKKKKKKKKKET SCRAPPPPPPPPPPPPPPPPP")
            )
          })
        


        //queue.exampleQueue.on('completed', (job, result) => {
        //io.emit('taskResult', {result: result.newnumber})
        //  })
    socket.on("disconnect", ()=>{
       console.log("Disconnected")})

  })
    
//module.exports = http
export default wshttp