import { 
    LOADING_USER,
    LOGGED_USER,
    LOGOUT_USER,
    ERROR_LOGIN,
    REGISTERING_USER,
    REGISTERED_USER,
    ERROR_REGISTER,    
} from '../constants/action-types'
  
  const initialState = {
  
    username: 'anonymous',
    loading: false,
    error: '',
    status: 'logout'
  
  }
  
  const userReducer = (state = initialState, action) => {
  
    //console.log(action.payload, "PAYLOAD")
    switch (action.type) {
  
      case LOADING_USER:
  
        return {
          // IF DONT WANT KEEP THE PREVIOUS STATE WHILE LOADING
          ...state,
          loading: true
  
        }
  
      case LOGGED_USER:
          console.log(action.payload, "CREATEEEEEE SOY PAYLOAd PARa REDUCER")
          return {
            ...state,
            username: action.payload,
            loading: false,
            error: '',
            status: 'logged',

    
          };
      
      case LOGOUT_USER:
        console.log(action.payload, "GETTTTTTTTT SOY PAYLOAd PARa REDUCER")
        return {
          ...state,
          username: 'anonymous',
          loading: false,
          status: 'logout'

  
        };
  
      case ERROR_LOGIN:
        console.log(action.payload, "UUUUUUUUUPDATE SOY PAYLOAd PARa REDUCER")
          return {
            ...state,
          username: 'anonymous',
          loading: false,
          status: 'logout',
          error: action.payload
    
       };
  
       case REGISTERED_USER:
        console.log(action.payload, "DDDDDEEELETE SOY PAYLOAd PARa REDUCER")
        return {
          ...state,
          username: action.payload,
          loading: false,
          status: 'registered',

  
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