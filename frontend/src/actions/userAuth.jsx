import {
    LOADING_USER,
    LOGGED_USER,
    LOGOUT_USER,
    ERROR_LOGIN,
    REGISTERING_USER,
    REGISTERED_USER,
    ERROR_REGISTER
} from '../constants/action-types'
import axios from 'axios'
import {store} from '../store/store'
import Swal from 'sweetalert2'
//import adapter from 'axios/lib/adapters/http'
import {hist}from '../layout/Main';
import { SSL_OP_COOKIE_EXCHANGE } from 'constants';
//const STATE = store.getState()

  
export const registerUser = (url, method='post', data) => async(dispatch) => {
  
    //console.log(STATE.example, "app state");
    //console.log(url, "URL");
    //console.log(method, "METHOD");
    //console.log(data, "DATA TO FETCH");
    
    dispatch({ type: LOADING_USER })
    
  
    await axios(
      {
        method,
        url,
        data
        }      
    )
      .then(response => {
        
        dispatch({ type: REGISTERED_USER, payload: response.data.message })
        hist.push('/login')
        
            Swal.fire({
              title: 'REGISTER SUCCESS!',
              text: `${response.data.name} REGISTERED SUCCESSFULLY`,
              icon: 'success',
              confirmButtonText: 'Ok'
          })          
      })
      .catch(error => {
        
        dispatch({ type: ERROR_REGISTER, payload: error.message })
        Swal.fire({
          title: 'ERROR REGISTERING!',
          text: error.response ?  error.response.data.message : error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
  }


export const LoginUser = (url, method='post', data) => async(dispatch) => {
  
    //console.log(STATE.example, "app state");
    //console.log(url, "URL");
    //console.log(method, "METHOD");
    //console.log(data, "DATA TO FETCH");
        
      dispatch({ type: LOADING_USER })
      
      await axios(
        {
          method,
          url,
          data,
          withCredentials: true
          }
        
      )
        .then(response => {
          // console.log(response, "RESPONSE from login success")
          sessionStorage.setItem('access-token', response.data.message.accessToken)
          sessionStorage.setItem('refresh-token', response.data.message.refreshToken)

          dispatch({ type: LOGGED_USER, 
                    payload: {
                      username: response.data.message.username,
                      id: response.data.message._id
                    }})
              Swal.fire({
                title: 'LOGGIN SUCCESS!',
                text: `${response.data.message.username} WELCOME`,
                icon: 'success',
                confirmButtonText: 'Ok'
              })
              hist.push('/list')            
        })
        .catch(error => {
          
          dispatch({ type: ERROR_LOGIN, payload: error.message })
          Swal.fire({
            title: 'ERROR LOGIN!',
            text: error.response ?  error.response.data.message : error.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        })
    }
  
export const LoggedOut = () => {
  
          //console.log('LOGGED_OUT')
          sessionStorage.clear()
          //document.cookie = "tkcookie= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
          hist.push('/')
              Swal.fire({
                title: 'LOGGED OUT!',
                text: 'you exit from the app',
                icon: 'info',
                confirmButtonText: 'Ok'
              })
          return {type: LOGOUT_USER}
}
        
      
      