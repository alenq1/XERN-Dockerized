import React from 'react'
import {Provider} from 'react-redux'
import {store, persistor} from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import 'bootstrap/dist/css/bootstrap.css';
import { createGlobalStyle } from 'styled-components';
import Main from './layout/Main'

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500&display=swap');

:root{

--text-primary: #b6b6b6;
--text-secondary: #ececec;
--bg-primary: #232323;
--bg-secondary: #141414;

}

* {
  box-sizing: border-box; 
  margin: 0;
  padding: 0;
}

body{
  font-family: 'Montserrat', sans-serif;
  width: 100vw;
  height: 100vh;
}
`


const App = () => {

  return (
    
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyle/>  
          <Main/>
        </PersistGate>
      </Provider>
    
)
}

export default App
