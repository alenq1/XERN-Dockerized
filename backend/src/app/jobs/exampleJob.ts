import fetchWeather from '../helpers/fetchWeather'
import {Ijobs} from '../interfaces/jobs'

export const singlejob: Ijobs = {

  name: 'fetchWeather',
  action: fetchWeather,
  options: {
    repeat: {
      every: 30000,
      removeOnComplete: true
    }
  },
  queue: ''

}

//console.log(jobs, 'jobs list')
//const exampleJob = new Queue('exampleJob', config.services.redis)
//exampleQueue.process(  (job, done) => {
//  const total = Math.floor((Math.random() * job.data.number) + 1)
//  console.log(total, "JOB PROCCESS RESULT")
//
//  done(null, {newnumber: total})
//})