import axios from 'axios'


const fetchBackendApi: any = async(url: string, method='get', data = null) => {
  
  await axios(
      {
        method,
        url,
        data
      }
      
  )
}

export default fetchBackendApi