import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux'
import exampleReducer from '../reducers/exampleReducer'
import userReducer from '../reducers/userReducer'
import WSocketReducer from '../reducers/WSocketReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}


const reducers = combineReducers({
  example: exampleReducer,
  user: userReducer,
  socketdata: WSocketReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  persistedReducer,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  storeEnhancers(applyMiddleware(thunk))
)
let persistor = persistStore(store)

export {store, persistor}

