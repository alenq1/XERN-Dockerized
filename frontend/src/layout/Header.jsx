import React from 'react'
import { Nav, Navbar, Button, DropdownButton, Dropdown, Image } from 'react-bootstrap'
import { Redirect, withRouter, NavLink, Link } from 'react-router-dom'

import {connect} from 'react-redux'
import {sources, StyleSettings} from '../settings/config';
import {LoggedOut} from '../actions/userAuth';
import SessionButton from '../components/buttons/SessionButton';
import LoginButton from '../components/buttons/LoginButton';
import styled from 'styled-components';



const StyledHeader = styled.nav`


position: fixed;
background-color: var(--theme-color);
color: var(--background-app);
top: 0;
width: 100%;
display: flex;
height: var(--width-header-sidebar);
z-index: 3;

img{
  width: 8.5rem;
  height: 5rem;
  margin-left: 4rem;
  margin-top: -.5rem;  
}

.header-title {
  margin: auto 1rem;
  text-decoration: none;
  color: var(--background-app);
}

.buttons {
  margin: .7rem 1rem .3rem auto;
  
  
  button {
    background: transparent;
    color: var(--background-app);
  }

  svg{
    width: 1.5rem;
    height: 1.5rem;
    margin:  0 .5rem;
    color: var(--background-app);
  }
}

.no-buttons {
  button {
    display: none;
  }
}

@media screen and (max-width: ${StyleSettings.MaxDisplayMobile}) {
  
.header-title, .login-text, .session-username{
  display: none;
}

img {
  width: 8.5rem;
  height: 5rem;
  margin-left: 0rem;
  padding: .5rem; 
}

}
`


const Header = ({username, status, LoggedOut, history}) => {
  
  //if(history.location.pathname ==='/login'){return null}
  
  return (
    
    <StyledHeader>
      {/* {console.log(history.location.pathname, 'history on HEADER')} */}
      <img src={sources.logo} alt="MERN Boilerplate"/>
      <NavLink to="/" className="header-title">
            Boilerplate
      </NavLink>      
      <span className={history.location.pathname !== '/login' ? 'buttons': 'no-buttons'}>
        {
          username !== 'anonymous' && status === 'logged' ? 
            <SessionButton 
              username={username}
              LoggedOut={LoggedOut}
              status={status}
            />        
            : 
            <LoginButton/>
        }
      </span>    
    </StyledHeader>
  )
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  status: state.user.status,

})

const mapDispatchToProps = dispatch => ({
  LoggedOut: () => dispatch(LoggedOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
