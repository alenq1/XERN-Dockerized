import Queue from 'bull'
import config from '../settings/config'
import * as jobs from '../jobs/index'
//import {fetchWeather, options} from '../app/jobs/exampleJob'







//console.log(jobs, 'jobs list')

//export const finalList: any = []
let maxJobsPerWorker = 50;


const QueueList = (workerjobs: any) => {

  //console.log(workerjobs, "WORKERJOBS")

  workerjobs.map( singlejob =>
    {
      
      console.log(singlejob.name, 'QUeue name')
      singlejob.queue = new Queue(singlejob.name, config.services.redis)
     // currentQueue.add(fetchWeather('chicago'), options)
  
      //console.log(singlejob.queue, 'SINGLE QUEUE')
//      console.log(singlejob.action, 'acciona ejecutar')
      

  //    singlejob.queue.process((job, done) => {
      
        //console.log(job, "JOB SOLO")
        //console.log(job.data, "JOB DATA CONTETN")
        
        

  //console.log(job.data, "JOB DATA CONTETN")
//         let progress = 0;

//         // throw an error 5% of the time
//       if (Math.random() < 0.05) {
//         throw new Error("This job failed!")
//       }

//       while (progress < 100) {
//         await setTimeout(function() {
// //          console.log('waiting 50 seconds');
//       }, 50000);
//         progress += 1;
//         job.progress(progress)
//       }

//     // A job can return values that will be stored in Redis as JSON
//     // This return value is unused in this demo application.
//       return { value: "This will be stored" };
      
       //})
//       console.log(singlejob.queue, "ESTADO FINA:L DE QUQUEE")
//       singlejob.queue.on('completed', (job, result) => {
//        console.log(`Job completed with result ${result}`);
//      })
  //     finalList.push(singlejob.queue)
    })
    

}

QueueList(Object.values(jobs))

console.log(jobs, "DESPUES DE PROCESARRRRRRRRRRRRRRRRRRR")


jobs.Weather.queue.add({location:config.misc.cities}, jobs.Weather.options)
jobs.Weather.queue.removeRepeatable(jobs.Weather.options)
//jobs.Weather.queue.on('completed', jobs.Weather.queue.close)


export const newJobs = jobs










