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

//const STATE = store.getState()

  
export const registerUser = (url, method='post', data) => async(dispatch) => {
  
  //console.log(STATE.example, "ESTADO de LA APP");

    console.log(url, "URL A CONSULTAR");
    console.log(method, "METODO A USAR ");
    console.log(data, "DATA MANDADADA PARA FETCH");
    
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
              text: `${response.data.name} REGISTERED SUCCESSFULLTY`,
              icon: 'success',
              confirmButtonText: 'Cool'
          })
  
          
      })

  
      .catch(error => {
        
        dispatch({ type: ERROR_REGISTER, payload: error.message })
        Swal.fire({
          title: 'ERROR REGSITERING!',
          text: error.response ?  error.response.data.message : error.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      })
  }




export const LoginUser = (url, method='post', data) => async(dispatch) => {
  
  //  console.log(STATE.example, "ESTADO de LA APP");
  
      console.log(url, "URL A CONSULTAR");
      console.log(method, "METODO A USAR ");
      console.log(data, "DATA MANDADADA PARA FETCH");
      
      dispatch({ type: LOADING_USER })
      
    
      await axios(
        {
          method,
          url,
          data
          }
        
      )
        .then(response => {
          console.log(response, "RESPONSE DE LOGIN CORRECTO")
          localStorage.setItem('access-token', response.data.message.accessToken)
          localStorage.setItem('refresh-token', response.data.message.refreshToken)
          dispatch({ type: LOGGED_USER, payload: response.data.message.username })
              Swal.fire({
                title: 'LOGGIN SUCCESS!',
                text: `${response.data.message.username} WELCOME`,
                icon: 'success',
                confirmButtonText: 'Cool'
              })
              hist.push('/list') 
          
            
        })
    
        .catch(error => {
          
          dispatch({ type: ERROR_LOGIN, payload: error.message })
          Swal.fire({
            title: 'ERROR LOGIN!',
            text: error.response ?  error.response.data.message : error.message,
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        })
    }
  

export const LoggedOut = () => {
  
          localStorage.clear()
          hist.push('/')
              Swal.fire({
                 title: 'LOGGED OUT!',
                 text: 'you exit from the app',
                 icon: 'info',
                 confirmButtonText: 'Ok'
               })
          return {type: LOGOUT_USER}
          
           
              
            }
        
      
      