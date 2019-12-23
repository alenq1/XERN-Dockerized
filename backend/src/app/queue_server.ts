//import Queue from 'bull'
//import config from './settings/config'
import {newJobs} from '../app/helpers/queuelist'
import * as jobs from '../app/jobs/index'
//import {fetchWeather, options} from '../app/jobs/exampleJob'
import {setQueues} from 'bull-board'
import {io} from '../app/socket/sockets'
import { Ijobs } from './interfaces/jobs'


// setQueues(newJobs.Weather.queue)
// //console.log(jobs, "jobs en server ")
// console.log(newJobs.Weather.queue, "new jobs en server ")
// newJobs.Weather.queue.on('completed', (job, result) => {
//   console.log(`Job completed with resultttttttttttttttttttt ${job.returnvalue}`);
//   console.log(job, "job completed state");
// })

//console.log(Object.values(newJobs), "for start server")

const StartService = (jobsList: any) => {

  Object.values(jobsList).map( (job: any) =>{ 

    setQueues(job.queue)
    job.queue.process(job.action)
    console.log(job.queue.name, "Processing jobs")
    console.log(job.queue.getRepeatableJobs(), "repeatable jobs")
  })
}

StartService(newJobs)

//console.log(newJobs, "PROCESANDo TRABAJOS")
//console.log(finalList, "Queue list")
//QueueList(Object.values(jobs))
// const start = (list) => {

// list.map( queue => {

//   console.log(queue.name, "STARTED")
// }
//   )}
// start(QueueList)
