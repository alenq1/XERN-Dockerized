import React from 'react'
import { Nav, Navbar, Button, DropdownButton, Dropdown, Image } from 'react-bootstrap'
import { Redirect, withRouter, NavLink, Link } from 'react-router-dom'
import {FaSignInAlt} from 'react-icons/fa'
import styled from 'styled-components'


const StyledButton = styled(Button)`


`


const LoginButton = ({history}) => {
    return (
        <StyledButton onClick={(e) =>           
            history.push("/login")        
        }>
            <span className="login-icon"><FaSignInAlt/></span>
            <span className="login-text">Login</span>                        
        </StyledButton>
    )
}

export default withRouter(LoginButton)