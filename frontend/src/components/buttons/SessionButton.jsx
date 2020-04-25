import React from 'react'
import { Nav, Navbar, Button, DropdownButton, Dropdown, Image } from 'react-bootstrap'
import {FaUserCircle} from 'react-icons/fa'
import { Redirect, withRouter, NavLink, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import styled from 'styled-components'


const StyledSessionButton = styled.div`



`

const SessionButton = ({username, history, LoggedOut}) => {
    return (

      <StyledSessionButton>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">            
            <FaUserCircle/>
            <span className='session-username'>{username}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => history.push('/profile')}>Profile</Dropdown.Item>          
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
            </Dropdown.Menu>
          </Dropdown>      
        </StyledSessionButton>
    )
}
export default withRouter(SessionButton)