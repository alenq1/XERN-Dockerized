import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Title from '../components/Title'
import { withRouter } from 'react-router-dom';
import MainTable from '../components/tables/MainTable'
import UserData from '../components/tables/UserData'
import {ModalData, useModal} from '../components/ModalData'
import { sortData } from '../selectors/sortData';
import FormPasswordChange from '../components/forms/FormPasswordChange';
import {setSort} from '../actions/sort'
import fetchCrudApi from '../actions/fetchCrudApi'
import {sources, StyleSettings} from '../settings/config'
import CreateButton from '../components/buttons/CreateButton';
import CardTemplate from '../components/CardTemplate';
import styled from 'styled-components'


const StyledProfile = styled.div`

display: flex;
margin: 5% auto;
justify-content: center;
width: 100%;


.profile-content {
    
    padding: 2rem 2rem .5rem 2rem;
    display: flex;
    flex-wrap: wrap;

    span {
        width: 50%;
    }

    .password-form {
        width: 100vw;

    }
    
    button {
        width: 50%;
    }
}

@media screen and (max-width: ${StyleSettings.MaxDisplayMobile}) {

margin: 0;
justify-content: center;
font-size: .75rem;

.profile-content {
    
    padding: 1rem 1rem .5rem 1rem;
    display: flex;
    flex-wrap: wrap;

    span {
        width: 50%;
    }

    .password-form {
        width: 100vw;

        input {
            height: 1.5rem;
        }
    }
    
    button {
        margin: 1;
        width: 75%;        
        font-size: .75rem;
    }
}

}

`


const Profile = ({result, fetchCrudApi, loading, auth}) => {

    
    // const {show, handleShow, handleClose, data, setData} = useModal()
    // const [action, setAction] = useState('list')
    // const columns = 
    //     [
    //     'Name',
    //     'Mail',
    //     'Role',
    //     'Status',
      
    // ]    
    useEffect(() => {
        
        fetchCrudApi(`${sources.UsersUrl}${auth.id}`,'get',null)
    //     //console.log(action, "Form action")
    }, [])

    return (
        <StyledProfile>
        {result ?

            result.map( (user) => (
            <CardTemplate title={'MyProfile'} smWidth={'85%'} key={user.username}>
                <div className='profile-content'>
                    <span>Username</span><p>{user.username}</p>
                    <span>Email</span><p>{user.email}</p>
                    <span>Created at</span><p>{user.created}</p>
                    <span>Role</span><p>{user.role}</p>
                    <span>Status</span><p>{user.active ? 'active' : 'inactive'}</p>
                    <div className="password-form">
                        <FormPasswordChange 
                            data={{ 
                                password: '',
                                passwordConfirmation: ''
                            }}
                            fetchCrudApi={fetchCrudApi}
                            formType={'change password'}
                            action={'patch'}
                            id={auth.id}
                    />
                    </div>
                </div>
            </CardTemplate>

            ))
            :
            <p>NO DATA</p>
        }
        </StyledProfile>
    )
}

    const mapStateToProps = (state) => ({
    result: sortData(state.example), 
    loading: state.example.loading, 
    auth: state.user
})

const mapDispatchToProps = dispatch => ({
    fetchCrudApi: (url, method, data) => dispatch(fetchCrudApi(url, method, data)),
    })

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))
