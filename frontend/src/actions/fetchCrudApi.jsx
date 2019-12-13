import {
    CREATE_DATA,
    FETCH_DATA,
    UPDATE_DATA,
    DELETE_DATA,
    LOADING_DATA,
    ERROR_FETCH,
    
} from '../constants/action-types'
import axios from 'axios'
import {store} from '../store/store'
import Swal from 'sweetalert2'
import {LoggedOut} from './userAuth'
import {sources} from '../settings/config'
//import adapter from 'axios/lib/adapters/http'
import {hist}from '../layout/Main';
const STATE = store.getState()


//axios.defaults.headers.common['access-token'] = localStorage.getItem('access-token')



axios.interceptors.response.use(function (response) {
  return response;
}, 
  function (error) {
    const originalRequest = error.config;
    if (!error.response) {
    console.log(error, 'ERROR PRIAMRIO AL PRINCIPIO')
      return Promise.reject(error)
    }
    if(error.response.status === 401 && error.config.url === sources.refreshUrl){
      console.log("SEGUNDO RECHAZO")
      hist.push("/login")  
      localStorage.clear()
      LoggedOut()
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
    // Hace la solicitud de refresco de tokens
      originalRequest._retry = true;
    console.log(error.response.data, 'tipo de  error 401')
    console.log( localStorage.getItem('refresh-token'),  localStorage.getItem('access-token'), 'tokens despues de 401')
    console.log( 'se lanza peticion de refresh')
      return axios({
        method: 'post',
        url: sources.refreshUrl, 
        headers: {'refresh-token': localStorage.getItem('refresh-token')}
        
      })
        .then((responseData) => {

        console.log( localStorage.getItem('refresh-token'),  localStorage.getItem('access-token'), 'originales antes de cambiar')
        console.log(responseData.data, 'respuesta a consulta de refresh')
          localStorage.setItem('access-token', responseData.data.message)
          //originalRequest.headers['Authorization'] = 'Bearer ' + localStorage.access-token;
        
        axios.defaults.headers.common['access-token'] = localStorage.getItem('access-token')
        originalRequest.headers['access-token'] = localStorage.getItem('access-token')
        // re-intenta la solicitud original
          return axios(originalRequest);
        })
        .catch((error) => {
        console.log(localStorage.getItem('access-token'), localStorage.getItem('refresh-token'), 'tokens CON NUEVO ERROR PARA SER BORRADOS')
        console.log(error.response, 'ERROR DE NUEVO EN PETICION')
          
        //localStorage.clear()

        //hist.push("/login")
        LoggedOut()
          return Promise.reject(error);
        });
  }
  else if (error.response.status === 401) {
    //console.log(error, 'ERROR 500 de Serrvidor')
    return Promise.reject(error)
  }
  
  else if (error.response.status === 500) {
    //console.log(error, 'ERROR 500 de Serrvidor')
    return Promise.reject(error)
  }
  else if (error.response.status === 404) {
    //console.log(error, 'ERROR 404 No se encontro')
    return Promise.reject(error)
  }
  else if (error.response.status === 400) {
    console.log(error.response.data, 'ERROR 400 Mal request')
    return Promise.reject(error)
  }
  else {
  console.log( localStorage.getItem('refresh-token'),  localStorage.getItem('access-token'), 'tokens DEVUELTOS EN ULTIMA PARTE')
  console.log(error, 'ULTIMA PARTE DE ERROR DE PARA DEVOLVER')
  localStorage.clear()
  hist.push("/login")
  LoggedOut()
  return Promise.reject(error)
  }

})


const fetchCrudApi = (url, method, data) => async(dispatch) => {
  
  console.log(STATE.example, "ESTADO de LA APP");
  axios.defaults.headers.common['access-token'] = localStorage.getItem('access-token')
    console.log(url, "URL A CONSULTAR");
    console.log(method, "METODO A USAR ");
    console.log(data, "DATA MANDADADA PARA FETCH");
    if(method === 'get'){
    dispatch({ type: LOADING_DATA })
    }
  
    await axios(
      {
        method,
        url,
        data
        }
      
    )
      .then(response => {
        
        if(method === 'get'){
          {
          console.log(response.data, "GET DATA STATE");  
          dispatch({ type: FETCH_DATA, payload: response.data.message })
          
          }
        }
        if(method === 'post'){
            console.log(response.data, "CREATE STATE");
            dispatch({ type: CREATE_DATA, payload: response.data.message })
            Swal.fire({
              title: 'CREATE SUCCESS!',
              text: `${response.data.message.name} created`,
              icon: 'success',
              confirmButtonText: 'Ok'
            })
          }
          
          if(method === 'patch'){
          console.log(response.data, "UPDATE STATE");
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
            console.log(response.data, "DELETE STATE");
            dispatch({ type: DELETE_DATA, payload: response.data.message })
          
          Swal.fire({
            title: 'DELETE SUCCESS!',
            text: `${response.data.message.name} Deleted`,
            icon: 'success',
            confirmButtonText: 'ok'
          })
          }


        
      })
  
      .catch(error => {
        console.log(error, "RESPUESTA DE ERROR DE PETICION");
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
