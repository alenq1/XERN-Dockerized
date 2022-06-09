
import React, {useState} from 'react'
import FormLogin from '../components/forms/FormLogin'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import {registerUser, LoginUser} from '../actions/userAuth'
import {FaSignInAlt, FaEdit} from 'react-icons/fa'
import styled from 'styled-components'
import {StyleSettings} from '../settings/config';


const StyledLoginRegister = styled.div`




display: flex;
padding-top: 6rem;



.login-reg-card {
    width: 30%;
    margin: auto;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
    transition: 0.3s;
    position: relative;
    
}

.login-reg-header {
    display: flex;
    background: black;
    

    h1 {
        padding: 1.5rem;
        color: white;
        width: 50%;
    }
    
    span {
        color: white;
        margin-top: 5rem;
        margin-left: 2rem;
    }

    svg {
        color: darkblue;
        width: 8rem;
        height: 8rem;
        position: absolute;
        right: 0;
        background: transparent;
        margin: -12% -4%;
    }
}

.login-reg-body {
    padding: 2rem 1rem;
    background: linear-gradient(to bottom, rgba(226,226,226,1) 0%, rgba(219,219,219,1) 50%, rgba(209,209,209,1) 51%, rgba(254,254,254,1) 100%);
}

input{
    margin: .75rem 0;
    padding: 1.5rem 1rem;
    background-color: whitesmoke;
    
}
input:focus {
  
}

button {   
    margin-top: 1rem;
    background: #0303f8;
    width: 30%;
    
}

button:hover {   
    
    background: #1200aff4;
    
    
}

@media screen and (max-width: ${StyleSettings.MaxDisplayMobile}) {

padding-top: 3rem;

    .login-reg-card {
    
    width: 85%;
    
    h1{
        padding: 1rem;
        font-size: 1.5rem;
        width: 45%;
    }

    span {
        font-size: .75rem;
        color: white;
        margin-top: 3rem;
        margin-left: 3rem;
        margin-right: 0rem;
    }

    
    svg{
        width: 5rem;
        height: 5rem;
        
    }

    }

input{
    
    padding: 1rem;
    
    
}


    button {   
    
    width: 60%;
    
}

}


`

const Login = ({registerUser, LoginUser, history, username, status}) => {

    //console.log(history, "history on login")
    

    const register = {
        name: 'register',
        action: registerUser,
        values: {username: '', password: '', email: ''},
        icon: <FaEdit/>
    }
    const login = {
        name: 'login',
        action: LoginUser,
        values: {username: '', password: ''},
        icon: <FaSignInAlt/>
    }
    
    const [userForm, setUserForm] = useState(login)

    if(username !== 'anonymous' &&  status === 'logged'){ history.push('/')}
    
    return (
        <StyledLoginRegister>
            <div className="login-reg-card">
                <div className="login-reg-header" onClick={() => setUserForm(userForm.name === 'login' ? register : login)}>
                    <h1>
                        {userForm.name}                        
                    </h1>
                    <span>
                        {userForm.name === 'login' ?
                        'Go to register'    
                        :
                        'Back to Login'
                    }                        
                    </span> 
                    {userForm.icon}
                </div>
                <div className="login-reg-body">
                    <FormLogin 
                        data={userForm.values}
                        action={userForm.action}
                        formType={userForm.name}
                    />
                </div>
            </div>
        </StyledLoginRegister>
    )
}

const mapStateToProps = (state) => ({
    username: state.user.username,
    status: state.user.status,
  })

const mapDispatchToProps = dispatch => ({
    registerUser: (url, method, data) => dispatch(registerUser(url, method, data)),
    LoginUser: (url, method, data) => dispatch(LoginUser(url, method, data))

})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))