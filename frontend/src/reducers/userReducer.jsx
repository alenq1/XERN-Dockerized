import { 
    LOADING_USER,
    LOGGED_USER,
    LOGOUT_USER,
    ERROR_LOGIN,
    REGISTERING_USER,
    REGISTERED_USER,
    ERROR_REGISTER,    
    GET_PROFILE
} from '../constants/action-types'
  
  const initialState = {
  
    username: 'anonymous',
    id: null,
    loading: false,
    error: '',
    details: {},
    status: 'logout'
  
  }
  
  const userReducer = (state = initialState, action) => {
  
    //console.log(action.payload, "action payload")
    switch (action.type) {
  
      case LOADING_USER:
  
        return {
          // IF DONT WANT KEEP THE PREVIOUS STATE WHILE LOADING
          ...state,
          loading: true 
        }
  
      case LOGGED_USER:
          //console.log(action.payload, "logged user action avalue")
          return {
            ...state,
            username: action.payload.username,
            id: action.payload.id,
            loading: false,
            error: '',
            status: 'logged'
          };
      
      case LOGOUT_USER:
        //console.log( "logout action")
        return initialState;
  
      case ERROR_LOGIN:
        //console.log(action.payload, "error login action")
          return {
            ...state,
          username: 'anonymous',
          loading: false,
          status: 'logout',
          error: action.payload
        };
  
      case REGISTERED_USER:
        //console.log(action.payload, "register user action values")
        return {
          ...state,
          username: action.payload,
          loading: false,
          status: 'registered',
        }; 

        case GET_PROFILE:
        //console.log(action.payload, "register user action values")
        return {
          ...state,
          details: action.payload
        }; 
  
      case ERROR_REGISTER:
  
        return {
          ...state,
          username: 'anonymous',
          error: action.payload,
          loading: false
        }
  
      default:
        return state
    }
  }
  
export default userReducer;