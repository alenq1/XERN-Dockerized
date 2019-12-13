//import Queue from 'bull'
//import config from './settings/config'
import {newJobs} from '../app/helpers/queuelist'
import * as jobs from '../app/jobs/index'
//import {fetchWeather, options} from '../app/jobs/exampleJob'
import {setQueues} from 'bull-board'
import {io} from '../app/socket/sockets'

// newJobs.Weather.queue.add({location:'miami'})
// setQueues(newJobs.Weather.queue)
// //console.log(jobs, "jobs en server ")


// console.log(newJobs.Weather.queue, "new jobs en server ")

// newJobs.Weather.queue.on('completed', (job, result) => {
  
//   console.log(`Job completed with resultttttttttttttttttttt ${job.returnvalue}`);
//   console.log(job, "ESTADO dEL JOB COMPLEATOD");
// })

//console.log(Object.values(newJobs), "PARA ARRANCAR SERVER")

Object.values(newJobs).map( job =>{ 

  setQueues(job.queue)
  job.queue.process(job.action)
  console.log(job.queue.name, "PROCESANDo TRABAJOS")
  console.log(job.queue.getRepeatableJobs(), "TABAJOS REPETTTTTTTTTTTTTTTTIDOS")
})


//console.log(newJobs, "PROCESANDo TRABAJOS")





//console.log(finalList, "LISTA DE QUEUES")

//finalList[0].add('london')
//finalList[0].on('progress', (job) =>{
//  console.log(job, "jpb progress")
//})


//QueueList(Object.values(jobs))
// const start = (list) => {

// list.map( queue => {

//   console.log(queue.name, "STARTED")
// }
  
  
//   )}

// start(QueueList)
