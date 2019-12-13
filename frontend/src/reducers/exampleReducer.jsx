import { 
  LOADING_DATA, 
  CREATE_DATA,
  FETCH_DATA, 
  UPDATE_DATA,
  DELETE_DATA,
  ERROR_FETCH,
  SORTED
} from '../constants/action-types'

const initialState = {

  data: '',
  loading: false,
  error: '',
  sortKey: 'Price',
  sortDirection: 'desc'

}

const exampleReducer = (state = initialState, action) => {

  //console.log(action.payload, "PAYLOAD")
  switch (action.type) {

    case LOADING_DATA:

      return {
        // IF DONT WANT KEEP THE PREVIOUS STATE WHILE LOADING
        ...state,
        loading: true

      }

    case CREATE_DATA:
        console.log(action.payload, "CREATEEEEEE SOY PAYLOAd PARa REDUCER")
        return {
          ...state,
          data: state.data.concat([action.payload]),
          loading: false
  
        };
    
    case FETCH_DATA:
      console.log(action.payload, "GETTTTTTTTT SOY PAYLOAd PARa REDUCER")
      return {
        ...state,
        data: action.payload,
        loading: false

      };

    case UPDATE_DATA:
      console.log(action.payload, "UUUUUUUUUPDATE SOY PAYLOAd PARa REDUCER")
        return {
          ...state,
          data: state.data.map( field => {
            if(field._id === action.payload._id){
              return action.payload
            }
            else{
              return field
            }
          }),
          loading: false
  
     };

     case DELETE_DATA:
      console.log(action.payload, "DDDDDEEELETE SOY PAYLOAd PARa REDUCER")
      return {
        ...state,
        data: [...state.data].filter(field => field._id !== action.payload._id),
        loading: false

      }; 

    case ERROR_FETCH:

      return {
        ...state,
        error: action.payload,
        loading: false
      }
    
    case SORTED:
        return {
          ...state,
        sortKey: action.payload.sortKey,
        sortDirection: action.payload.sortDirection
        };
      
    
    default:

      return state

  }
}
export default exampleReducer;