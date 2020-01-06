import React, {useEffect} from 'react'
import Header from '../layout/Header'
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



export const hist = createBrowserHistory()


const Main = ({ConnectWS}) => {

  useEffect(() => {
    ConnectWS(sources.WSocket)
    }
  , [])


  return (
    
      <Router history={hist}>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/example' component={Example} />
          <PrivateRoute>
          <Route exact path='/list' component={Crud} />
          <Route exact path='/users' component={Users} />
          <Route exact path='/profile' component={Profile} />
          </PrivateRoute>
        </Switch>
        <Footer />
      </Router>
    
  )
}

export default connect(null, {ConnectWS})(Main)
