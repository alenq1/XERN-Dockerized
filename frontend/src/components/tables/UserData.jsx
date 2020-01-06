import React, {memo} from 'react'
//import {connect} from 'react-redux'
import {Table, Button, Form} from 'react-bootstrap';
import {FaTrash, FaInfoCircle, FaEdit, FaPlusSquare} from 'react-icons/fa'
//import {ModalData, useModal} from './ModalData';
//import { setSort } from '../actions/sort';
import {FaSortAmountUp, FaSortAmountDown} from 'react-icons/fa'
import {sources} from '../../settings/config'
import Swal from 'sweetalert2'

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
                <React.Fragment 
                
                >
                <tr key={field._id}>
                    <td>{field.username}</td>
                    <td>{field.email}</td>  
                    <td>
                        <Form.Control as="select" onChange={(e) => {                                    
                            setData(field)
                            fetchCrudApi(`${sources.UsersUrl}${field._id}`, 'patch', {role: e.target.value})
                        }}>
                            <option default value={field.role}>{field.role}</option>
                            <option default value="admin">Admin</option>
                            <option default value="privileged">privileged</option>
                            <option default value="normal">Normal</option>
                        </Form.Control>
                    </td>

                    <td>
                    <Button variant={field.active === true ? 'success' : 'danger'}
                    onClick={() => {                                    
                        setData(field)
                        fetchCrudApi(`${sources.UsersUrl}${field._id}`, 'patch', {active: !(field.active)})
                    }}
                    />
                    </td>
                    <td>
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
            </tr>
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
