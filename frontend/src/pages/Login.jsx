// @ts-check
import React, {useState} from 'react'
import FormLogin from '../components/FormLogin'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import {registerUser, LoginUser} from '../actions/userAuth'
import {Card} from 'react-bootstrap'

const Login = ({registerUser, LoginUser, history}) => {

    console.log(history, "HISTORIAL  EN  RAIZ LOGIN")

    const style = {

//        display: 'flex',
     justifyContent: 'center',
        width: 450,
        margin: 'auto',
        marginTop: 100,

        title:{
            alignContent: 'center'
        }
        
    }
    
    const register = {
        name: 'register',
        action: registerUser,
        values: {username: '', password: '', email: ''}
    }
    const login = {
        name: 'login',
        action: LoginUser,
        values: {username: '', password: ''}
    }
    
    const [userForm, setUserForm] = useState(login)
    
    return (
        <div>
            <Card style={style}>
            <Card.Header style={style.title} onClick={() => setUserForm(userForm.name === 'login' ? register : login)}>
            <h1>
            {userForm.name}
            </h1> 
            </Card.Header>
            <Card.Body>
            <FormLogin data={userForm.values}
             action={userForm.action}
             formType={userForm.name}
            />
            </Card.Body>
            </Card>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    registerUser: (url, method, data) => dispatch(registerUser(url, method, data)),
    LoginUser: (url, method, data) => dispatch(LoginUser(url, method, data))
  
  })


export default connect(null, mapDispatchToProps)(withRouter(Login))