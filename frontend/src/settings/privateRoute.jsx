import React from 'react';
import { Route, Redirect } from 'react-router-dom';

let maxRetries = 2
let retries = 0
const access = sessionStorage.getItem('tkaccess')
const refresh = sessionStorage.getItem('tkrefresh')
const Authenticated = (access, refresh) => {
    if(access && refresh){
        if(access.length === 199 && refresh.length === 200  ){
            return true

        }
    }
    else{
        retries++
        return false

    }
}
const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    
    //console.log(isAuth, 'is authhhhhhhh')
    return (
        <Route
            {...rest}
            render={props =>
                
                sessionStorage.getItem('tkaccess') && sessionStorage.getItem('tkrefresh') ?
                
                
                (
                    <Component {...props} {...rest} />
                ) 
                : 
                (
                    <Redirect 
                    to={{ pathname: '/login', state: { from: props.location } }}
                    />
                )
                

                }
                



                
        />
    );
}

export default PrivateRoute;