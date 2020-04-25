import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

const PrivateRoute = ({children, auth}) => {
    
    //console.log(children, "children");
    //console.log(auth.username, "User");
    //console.log(auth.status, "Status");
    return(         
        <React.Fragment>
          {auth.username !== 'anonymous' && auth.status !== 'logout' ? 
            children
            :
            <Redirect to='/login' />
          }
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
      auth: state.user,
    }
  }
  
export default connect(mapStateToProps, null)(PrivateRoute)
