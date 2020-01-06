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
import {sources} from '../settings/config'
import CreateButton from '../components/CreateButton';
import {Card} from 'react-bootstrap'


const Profile = ({result, fetchCrudApi, loading, auth}) => {

    const style={
        display: "flex",
        justifyContent: "center",
        margin: 150
    }
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
        <>
        {result ?

            result.map( (user) => (
            <Card style={style}>
                <Card.Header><h3>My profile</h3></Card.Header>
                <Card.Body>
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                    <p>{user.created}</p>
                    <p>{user.updated}</p>
                    <p>{user.role}</p>
                    <p>{user.active}</p>
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
                </Card.Body>
            </Card>

            ))
            :
            <p>NO DATA</p>
        }
        </>
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
