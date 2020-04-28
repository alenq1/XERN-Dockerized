import {
    CREATE_DATA,
    FETCH_DATA,
    UPDATE_DATA,
    DELETE_DATA,
    LOADING_DATA,
    ERROR_FETCH,
    
} from '../constants/action-types'
import axios from 'axios'
import Swal from 'sweetalert2'
import {LoggedOut} from './userAuth'
import {sources} from '../settings/config'
import {hist}from '../layout/Main';
//import {store} from '../store/store'
//import adapter from 'axios/lib/adapters/http'
//const STATE = store.getState()


//axios.defaults.headers.common['access-token'] = sessionStorage.getItem('access-token')


axios.interceptors.response.use(function (response) {
  return response;
}, 
  function (error) {
    const originalRequest = error.config;
    if (!error.response) {
    //console.log(error, 'First Resquest Error')
      return Promise.reject(error)
    }
    
    //PREVENT INFINITE LOOP WITH A LOGOUT,  
    //EX: WHEN TOKEN EXPIRED AND TRY REFRESH
    
    if(error.response.status === 401 && error.config.url === sources.refreshUrl){
      //console.log(error, 'Second reject error')
      LoggedOut()
      //hist.push("/login")
      sessionStorage.clear()      
      return Promise.reject(error);
    }

    // RETRY TO GET REFRESH TOKEN

    if (error.response.status === 401 && !originalRequest._retry) {
    
      originalRequest._retry = true;
    //console.log(error.response.data, 'error type')
    //console.log( sessionStorage.getItem('refresh-token'),  sessionStorage.getItem('access-token'), 'tokens before changes')
    //console.log('request for new access token')
      return axios({
        method: 'post',
        url: sources.refreshUrl, 
        headers: {'refresh-token': sessionStorage.getItem('refresh-token')}
      })
        .then((responseData) => {
        
        //console.log(responseData.data, 'response to new tken request')
          sessionStorage.setItem('access-token', responseData.data.message)
        //originalRequest.headers['Authorization'] = 'Bearer ' + sessionStorage.access-token;
        axios.defaults.headers.common['access-token'] = sessionStorage.getItem('access-token')
        originalRequest.headers['access-token'] = sessionStorage.getItem('access-token')
          return axios(originalRequest);
        })
        .catch((error) => {
        //console.log(sessionStorage.getItem('access-token'), sessionStorage.getItem('refresh-token'), 'tokens after error response')
        //console.log(error.response, 'finally error')
          sessionStorage.clear()
          LoggedOut()
          //hist.push("/login")
          return Promise.reject(error);
        });
  }
  else if (error.response.status === 401) {
    //console.log(error, 'ERROR 401 from server')
    return Promise.reject(error)
  }
  
  else if (error.response.status === 500) {
    //console.log(error, 'ERROR 500 from server')
    return Promise.reject(error)
  }
  else if (error.response.status === 403) {
    //console.log(error, 'ERROR 403 from server')
    hist.push("/")
    return Promise.reject(error)
  }
  else if (error.response.status === 404) {
    //console.log(error, 'ERROR 404 not found')
    return Promise.reject(error)
  }
  else if (error.response.status === 400) {
  // console.log(error.response.data, 'ERROR 400 Bad Request')
    return Promise.reject(error)
  }
  else {
  //
  //console.log(error, 'interceptor finally error cause')
  //hist.push("/login")
    sessionStorage.clear()
    LoggedOut()
    return Promise.reject(error)
  }

})


const fetchCrudApi = (url, method, data) => async(dispatch) => {
  
  //console.log(STATE.example, "app state");
  axios.defaults.headers.common['access-token'] = sessionStorage.getItem('access-token')
  // console.log({url, method, data}, "VALUES TO FETCH");
  
  if(method === 'get'){
    dispatch({ type: LOADING_DATA })
  }
  
    await axios(
      {
        method,
        url,
        data,
        withCredentials: true
        }
      
    )
      .then(response => {
        
        if(method === 'get'){
          
          // console.log(response.data, "GET DATA STATE");  
          dispatch({ type: FETCH_DATA, payload: response.data.message })          
          
        }
        if(method === 'post'){
            // console.log(response.data, "CREATE STATE");
            dispatch({ type: CREATE_DATA, payload: response.data.message })
            Swal.fire({
              title: 'CREATE SUCCESS!',
              text: `${response.data.message.name} created`,
              icon: 'success',
              confirmButtonText: 'Ok'
            })
          }
          
          if(method === 'patch'){
          // console.log(response.data, "UPDATE STATE");
          dispatch({ type: UPDATE_DATA, payload: response.data.message })
          
          Swal.fire({
            title: 'UPDATE SUCCESS!',
            text: `${response.data.message.name} updated`,
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          }
          if(method === 'delete')
          {
            // console.log(response.data, "DELETE STATE");
            dispatch({ type: DELETE_DATA, payload: response.data.message })
          
          Swal.fire({
            title: 'DELETE SUCCESS!',
            text: `${response.data.message.name} Deleted`,
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          }        
      })
  
      .catch(error => {
        // console.log(error, "error response from fetch");
        dispatch({ type: ERROR_FETCH, payload: error.message })
        Swal.fire({
          title: error.response ?  error.response.data.status : 'ERROR!',
          text: error.response ?  error.response.data.message : error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        
      })
  }

export default fetchCrudApi  
