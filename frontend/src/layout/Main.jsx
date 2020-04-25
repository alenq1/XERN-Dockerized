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
import {sources} from '../settings/config';
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from '../helpers/PrivateRoute';
import styled from 'styled-components'


const Wrapper = styled.div`


--width-size: 4rem;

width: 100vw;
height: 100vh;
background: whitesmoke;
/*
display: grid;
grid-template-columns: auto auto;
*/

.content {
    padding: 4rem 0rem 2rem 4rem;        
    width: 100%;
    height: 100%;
  }

  .sidebar {
    margin-top: 4rem;
    width: var(--width-size);
    background: black;
    position: fixed;
    z-index: 3;
    height: 100vh;
    transition: width 200ms ease;
    

  }

  .sidebar:hover{
    width: 16rem;
  }

  .sidebar:hover .link-text {
    display: block;
  }

  


@media screen and (max-width: 640px) {

  .sidebar {
    bottom: 0;
    width: 100vw;
    height: 4rem;
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
