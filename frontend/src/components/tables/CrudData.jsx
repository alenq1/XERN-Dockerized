import React, {memo} from 'react'
//import {connect} from 'react-redux'
import {Table, Button} from 'react-bootstrap';
import {FaTrash, FaInfoCircle, FaEdit, FaPlusSquare} from 'react-icons/fa'
//import {ModalData, useModal} from './ModalData';
//import { setSort } from '../actions/sort';
import {FaSortAmountUp, FaSortAmountDown} from 'react-icons/fa'
import {sources} from '../../settings/config'
import Swal from 'sweetalert2'

const CrudData = ({result, setData, fetchCrudApi, handleShow, setAction, colLength}) => {

    const style =  {

        margin: 20,
        //marg
        thead: {
            backgroundColor: 'black',
            color: 'white'
        },
        btnActions:{
            marginRight: 10
        }
    }

    return (
        <React.Fragment>
            {
            result  ?
    
            result.map(field =>(
                <React.Fragment 
                key={field._id}
                >
                <tr>
                    <td>{field.name}</td>
                    <td>{field.price}</td>  
                    <td>{field.quantity}</td>
                    <td>{field.description}</td>
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
                    <Button variant='warning'
                        style={style.btnActions}
                        onClick={() => {                                    
                            setData(field)
                            handleShow()
                            setAction('update')
                        }}>
                        <FaEdit/>
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
                
                            fetchCrudApi(`${sources.dataAdmin}${field._id}`, 'delete')
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

export default CrudData
