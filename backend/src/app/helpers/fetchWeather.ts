import config from '../settings/config'
import axios from 'axios'

const {urls} = config

export default async(job) =>{

    //console.log(job, "JOB PASSED TO PROCESS")
    //console.log(job.data, "JOB DATA PASSED")

    let data: any[] = []
    const promises: any[] = []

    job.data.location.map( async(url) => {

    //console.log(url, "LOCATION for request")
      promises.push(
        axios.get(                      
          urls.wheatherApi(url)                                        
        )
      )
    })
  //console.log(promises, "PROMISE TO DO") 
      await axios.all(promises)
      .then( response => {
        //console.log(response, "DATa FROM API"),
        Object.values(response).map( (result: any) =>{
        //console.log(result.statusText, "RESULT JOB FETCH WEATHER")
        data.push(result.data)
        })
      })
      
      .catch(error => {
        console.log(error, "ERROR ON FETCH WEATHER")
        data = error
      })

return Promise.resolve(data)
  
}