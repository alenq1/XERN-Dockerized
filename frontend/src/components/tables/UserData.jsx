import React, {memo} from 'react'
import {Button, Form} from 'react-bootstrap';
import {FaTrash, FaInfoCircle} from 'react-icons/fa'
import {sources, StyleSettings} from '../../settings/config'
import Swal from 'sweetalert2'
import styled from 'styled-components'
//import {connect} from 'react-redux'
//import {ModalData, useModal} from './ModalData';
//import { setSort } from '../actions/sort';
//import {FaSortAmountUp, FaSortAmountDown} from 'react-icons/fa'


const StyledUserData = styled.tr`


button {
    margin-right: 1rem;
}


@media screen and (max-width: ${StyleSettings.MaxDisplayMobile}) {

    .button-action{

        display: flex;
    
        button{
            width: 35px;
            height: 20px;
        }

        svg {
            margin-top: -1.5rem ;
            width: 10px;
            height: 10px;
        }
    }
}

`

const DataTables = ({result, setData, fetchCrudApi, handleShow, setAction, colLength}) => {

    const style =  {

        margin: 20,
        //marg
        thead: {
            backgroundColor: 'black',
            color: 'white'
        },
        btnActions:{
            marginRight: 10
        },
        btnActive: {
            backgroundColor: 'none'
        }
    }

    return (
        <React.Fragment>
            {
            result  ?
    
                result.map(field =>(
                    <React.Fragment key={field._id}>
                        <StyledUserData>
                            <td>{field.username}</td>
                            <td>{field.email}</td>  
                            <td>
                                <Form.Control as="select" onChange={(e) => {                                    
                                    setData(field)
                                    fetchCrudApi(`${sources.UsersUrl}${field._id}`, 'patch', {role: e.target.value})
                                }}>
                                    <option default value={field.role}>{field.role}</option>
                                    <option default value="admin">Admin</option>
                                    <option default value="privileged">Privileged</option>
                                    <option default value="normal">Normal</option>
                                </Form.Control>
                            </td>
                            <td>
                                <Button variant={field.active === true ? 'success' : 'danger'}
                                    onClick={() => {                                    
                                    setData(field)
                                    fetchCrudApi(`${sources.UsersUrl}${field._id}`, 'patch', {active: !(field.active)})
                                }}/>
                            </td>
                            <td className='button-action'>
                                <Button
                                    style={style.btnActions}
                                    onClick={() => {                                    
                                        setData(field)
                                        handleShow()
                                        setAction('list')
                                }}>
                                    <FaInfoCircle/>
                                </Button>
                                <Button variant='danger'
                                    style={style.btnActions}
                                        onClick={() => {
                                        console.log(`${sources.dataAdmin}${field._id}`)                                    
                                        Swal.fire({
                                            title: 'Are you sure?',
                                            text: "You won't be able to revert this!",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Yes, delete it!'
                                        })
                                        .then(async(result) => {
                                        if (result.value) {            
                                            fetchCrudApi(`${sources.UsersUrl}${field._id}`, 'delete')
                                        }})                                            
                                }}>
                                    <FaTrash/>
                                </Button>
                            </td>
                        </StyledUserData>
                    </React.Fragment>
                ))                    
                :
                <tr>
                    <td colSpan={colLength}>NO DATA</td>  
                </tr>        
            }  
        </React.Fragment>    
    )
}

export default DataTables
