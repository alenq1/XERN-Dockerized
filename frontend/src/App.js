import React from 'react'
import {Provider} from 'react-redux'
import {store, persistor} from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import 'bootstrap/dist/css/bootstrap.css';
import { createGlobalStyle } from 'styled-components';
import Main from './layout/Main'
import {StyleSettings} from './settings/config'

const GlobalStyle = createGlobalStyle`

@import url(${StyleSettings.fontUrl});

:root{

--theme-color: ${StyleSettings.themeColor};
--background-app: ${StyleSettings.background};
--width-header-sidebar: ${StyleSettings.widthHeaderSidebar};
--width-full-sidebar: ${StyleSettings.widthFullSidebar};
--font-color: ${StyleSettings.fontColor};
--svg-color: ${StyleSettings.iconsColor};
--card-background: ${StyleSettings.cardBackground};

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
