import React from 'react'
import { Nav, Navbar, Button, DropdownButton, Dropdown, Image } from 'react-bootstrap'
import { Redirect, withRouter, NavLink, Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {sources} from '../settings/config';
import {LoggedOut} from '../actions/userAuth';
import Swal from 'sweetalert2'


const style ={

  position: 'sticky',
  backgroundColor: 'black'

}

const Header = ({username, history, LoggedOut}) => {
  
  
  return (
    
    <Navbar sticky='top' style={style} variant="dark">
      <NavLink to="/">
        <Navbar.Brand className="ml-2">
          <Image
            src={sources.logo}
            width="115"
            height="45"        
            alt="MERN Boilerplate"
            rounded
            className="mr-3"
          />
            Boilerplate
        </Navbar.Brand>
      </NavLink>
      <Nav className="ml-2 mr-auto">      
      </Nav>
    
      <Nav>
      {
      username !== 'anonymous' ? 
      
        <DropdownButton alignRight
          title={username}  
          id="dropdown-menu-align-right">
    
          <Dropdown.Item eventKey="0" onClick={() => history.push('/')} >        
            Home
          </Dropdown.Item>        
          <Dropdown.Item eventKey="1" onClick={() => history.push('/profile')}>
            Profile        
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onSelect={function (){
            
            Swal.fire({
              title: 'Are you sure?',
              text: "You Want logout??",
              icon: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, Log out!'
            }).then((result) => {
              if (result.value) {
                LoggedOut()
              }
            })      
          }}> Logout
          </Dropdown.Item>
      </DropdownButton>
        : 
      <Button onClick={(e) =>           
          history.push("/login")        
        }>
          login
      </Button>
      }
    </Nav>    
  </Navbar>
  )
}

const mapStateToProps = (state) => ({
  username: state.user.username
})

const mapDispatchToProps = dispatch => ({
  LoggedOut: () => dispatch(LoggedOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
