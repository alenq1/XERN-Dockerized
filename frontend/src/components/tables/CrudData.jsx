import React, {memo} from 'react'
import {Button} from 'react-bootstrap';
import {FaTrash, FaInfoCircle, FaEdit} from 'react-icons/fa'
import {sources, StyleSettings} from '../../settings/config'
import Swal from 'sweetalert2'
import styled from 'styled-components'
//import {ModalData, useModal} from './ModalData';
//import { setSort } from '../actions/sort';



const StyledCrudData = styled.tr`


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

const CrudData = ({result, setData, fetchCrudApi, handleShow, setAction, colLength}) => {

    const style =  {

    }

    return (
        <React.Fragment>
            {
            result  ?
    
            result.map(field =>(
                <React.Fragment key={field._id}>
                    <StyledCrudData>
                        <td>{field.name}</td>
                        <td>{field.price}</td>  
                        <td>{field.quantity}</td>
                        <td>{field.description}</td>
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
                                    //console.log(`${sources.dataAdmin}${field.id}`)                                    
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
                        </StyledCrudData>
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
