//import config from './settings/config'
import {newJobs} from '../app/helpers/queuelist'
import {setQueues} from 'bull-board'
import { Ijobs } from './interfaces/jobs'


// //console.log(jobs, "jobs en server ")
// console.log(newJobs.Weather.queue, "new jobs en server ")
//console.log(Object.values(newJobs), "for start server")

const StartService = (jobsList: any) => {

  Object.values(jobsList).map( (job: any) =>{ 

    setQueues(job.queue)
    job.queue.process(job.action)
    console.log(job.queue.name, "Processing jobs")
    console.log(job.queue.getRepeatableJobs(), "repeatable jobs")
  })
}

try
{
  StartService(newJobs)
}
catch(error){
  console.log(error, "Queue service found error")
}

