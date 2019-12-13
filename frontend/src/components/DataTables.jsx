import React, {memo} from 'react'
//import {connect} from 'react-redux'
import {Table, Button} from 'react-bootstrap';
import {FaTrash, FaInfoCircle, FaEdit, FaPlusSquare} from 'react-icons/fa'
//import {ModalData, useModal} from './ModalData';
//import { setSort } from '../actions/sort';
import {FaSortAmountUp, FaSortAmountDown} from 'react-icons/fa'
import {sources} from '../settings/config'
import Swal from 'sweetalert2'
//import fetchCrudApi from '../actions/fetchCrudApi'




const DataTables = ({result, columns, handleShow, setData, fetchCrudApi, loading, setAction, setSort}) => {


    const style =  {

        margin: 20,
        //marg
        table:{
            marginTop: 45,
            marginLeft: 20,
            marginRight: 200, 
            textAlign: 'center'
        },
        thead: {
            backgroundColor: 'black',
            color: 'white'
        },
        btnCreate: {
            //marginLeft: '50%',
            //marginRight: '50%'
            marginLeft: '47%', 
            
        },
        btnActions:{
            marginRight: 10
        }


        

    }

    console.log(result, "DATA PASADA");
        
    return (
        <>
            <Button variant='success'
                    style={style.btnCreate}
                    onClick={() => {                                    
                    handleShow()
                    setAction('create')
                     }}>
                   <FaPlusSquare/>
            Create      
            </Button>
                                
            <Table  striped hover borderless responsive
            style={style.table}
            >
                <thead style={style.thead}>
                    <tr>
                        { columns && 
                        columns.names.map(field =>(
                        <th key={field}
                        onClick={() => setSort(field)}>
                        {field}
                        {columns.sortKey === field && columns.sortDirection === 'asc' ? <FaSortAmountUp/> : <FaSortAmountDown/>}
                        </th>  
                        ))}  
                        <th>Actions</th>                  
                    </tr>
                </thead>
                <tbody>
                    
                    { 
                    loading &&
                    <tr>
                    <td colSpan={columns.length}>Loading</td>  
                    </tr>
                    }
                    
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
                            <td><Button
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
                                    <FaTrash/></Button>
                            </td>
                        </tr>
                        </React.Fragment>
                        ))                    
                        :
                        <tr>
                        <td colSpan={columns.length}>NO DATA</td>  
                        </tr>
                        
                    }                            
            
                </tbody>                
               
            </Table>
            
        </>
         
    )
}


// const mapDispatchToProps = dispatch => ({
//     setSort: sortkey => dispatch(setSort(sortkey))
  
//   })
  


//export default connect(null, mapDispatchToProps)(DataTables)
export default memo(DataTables)