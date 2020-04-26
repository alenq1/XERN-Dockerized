import React, {useEffect, useCallback} from 'react'
import Header from '../layout/Header'
import Sidebar from '../layout/Sidebar'
import Home from '../pages/Home'
import Crud from '../pages/Crud'
import Login from '../pages/Login';
import Example from '../pages/Example'
import Users from '../pages/Users'
import Profile from '../pages/Profile'
import Footer from '../layout/Footer'
import {ConnectWS} from '../actions/wsocket';
import {connect} from 'react-redux';
import {sources, StyleSettings} from '../settings/config';
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from '../helpers/PrivateRoute';
import styled from 'styled-components'


const Wrapper = styled.div`

width: 100vw;
height: 100vh;
background: var(--background-app);
color: var(--font-color);
/*
display: grid;
grid-template-columns: auto auto;
*/

svg{
  color: var(--background-app);
}

.content {
    padding: 4rem 0rem 2rem 4rem;        
    width: 100%;
    height: 100%;
  }

  .sidebar {
    margin-top: var(--width-header-sidebar);
    width: var(--width-header-sidebar);
    background: var(--theme-color);
    position: fixed;
    z-index: 3;
    height: 100vh;
    transition: width 200ms ease;
    

  }

  .sidebar:hover{
    width: var(--width-full-sidebar);
  }

  .sidebar:hover .link-text {
    display: block;
  }


@media screen and (max-width: ${StyleSettings.MaxDisplayMobile}) {

  .sidebar {
    bottom: 0;
    width: 100vw;
    height: var(--width-header-sidebar);
    overflow: scroll;
  }
  
  .sidebar:hover {
    width: 100%;
  }

  .sidebar link.text:hover {
    display: inline;
    font-size: .5rem;
    
  }

  .content {
    padding: 4rem 0rem 0rem 0rem;
    overflow: scroll;
  }
}


`



export const hist = createBrowserHistory()


const pages = {

  normal: [
  {path: '/', component: Home},
  {path: '/login', component: Login},
  {path: '/example', component: Example},
  ],

  protected: [
    {path: '/list', component: Crud},
    {path: '/users', component: Users},
    {path: '/profile', component: Profile},
  ]
}


const Main = ({ConnectWS}) => {

  useEffect(() => {
    ConnectWS(sources.WSocket)
    }
  , [])


  return (
    
      <Router history={hist}>
        <Header />
        <Wrapper>
          <div className="sidebar">
            <Sidebar/>
          </div>
          <div className="content">
            <Switch>
              {pages.normal.map((page) => 
                <Route exact path={page.path} component={page.component} key={page.path}/>
              )}
              <PrivateRoute>
              {pages.protected.map((page) => 
                <Route exact path={page.path} component={page.component} key={page.path}/>
              )}
              </PrivateRoute>
            </Switch>
          </div>
        </Wrapper>
        <Footer />
      </Router>
    
  )
}

export default connect(null, {ConnectWS})(Main)
