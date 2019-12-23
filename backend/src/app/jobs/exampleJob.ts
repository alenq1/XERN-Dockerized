import Queue from 'bull'
import config from '../settings/config'
import axios from 'axios'
import Bull from 'bull'
import {Ijobs} from '../interfaces/jobs'

export const singlejob: Ijobs = {

  name: 'fetchWeather',

  action: async(job) =>{

    console.log(job, "JOB PASSED TO PROCESS")
    console.log(job.data, "JOB DATA PASSED")

    let data: any[] = []
    const promises: any[] = []

    job.data.location.map( async(url) => {

    console.log(url, "LOCATION for request")
                promises.push(
                  axios.get(                      
                      config.urls.wheatherApi(url)                                        
                  )
                )
    })


  console.log(promises, "PROMISE TO DO") 
  
  await axios.all(promises)
  .then( response => {console.log(response, "DATa FROM API"),
  
    Object.values(response).map( (result: any) =>{
      console.log(result.data, "RESULT")
    data.push(result.data)
    })
                  
  })
  .catch(error => {
    console.log(error, "ERROr EN CONSULTA")
    data = error
  })

  return Promise.resolve(data)
  
},

  options: {

  repeat: {
    every: 60000,
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