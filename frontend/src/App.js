import React from 'react'
import {Provider} from 'react-redux'
import {store, persistor} from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import 'bootstrap/dist/css/bootstrap.css';
import Main from './layout/Main'


const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Main/>
      </PersistGate>
    </Provider>
)
}

export default App
