import React from 'react'
import { Nav, Navbar, Button, DropdownButton, Dropdown } from 'react-bootstrap'
import { Redirect, withRouter, Link } from 'react-router-dom'
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
    
    <Navbar style={style} variant="dark">
    <Navbar.Brand  href="/" className="ml-2">
    <img
        src={sources.logo}
        width="125"
        height="45"        
        alt="MERN Boilerplate"
      />
      Boilerplate
    </Navbar.Brand>
    <Nav className="ml-2 mr-auto">      
    </Nav>
    
    <Nav>
      {
      username !== 'anonymous' ? 
      
        <DropdownButton alignRight
        title={username}  
        id="dropdown-menu-align-right">
        <Dropdown.Item eventKey="2" href="/">Home</Dropdown.Item>
        <Dropdown.Item eventKey="2" href="/profile">Profile</Dropdown.Item>
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
