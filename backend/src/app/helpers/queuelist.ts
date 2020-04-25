import Queue from 'bull'
import config from '../settings/config'
import * as jobs from '../jobs/index'
//import {fetchWeather, options} from '../app/jobs/exampleJob'


//console.log(jobs, 'jobs list')
//export const finalList: any = []

let maxJobsPerWorker = 50;

const QueueList = (workerjobs: any) => {

  //console.log(workerjobs, "WORKERJOBS")

  workerjobs.map( singlejob => {
      
    console.log(singlejob.name, 'Queue ready for process')
    singlejob.queue = new Queue(singlejob.name, config.services.redis)
    
    //console.log(singlejob.queue, 'SINGLE QUEUE')
      //console.log(singlejob.action, 'action to execute')
      //singlejob.queue.process((job, done) => {
      
      //console.log(job, "SOLO JOB")
      //console.log(job.data, "JOB DATA CONTETN")
      //let progress = 0;
  //     finalList.push(singlejob.queue)
    })
}

QueueList(Object.values(jobs))

//console.log(jobs, "Jobs after declared")
//configs for jobs queues 

jobs.Weather.queue.add({location:config.misc.cities}, jobs.Weather.options)
jobs.Weather.queue.removeRepeatable(jobs.Weather.options)


export const newJobs = jobs
