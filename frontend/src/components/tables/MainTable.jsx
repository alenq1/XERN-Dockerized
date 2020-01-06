import React, {memo} from 'react'
//import {connect} from 'react-redux'
import {Table, Button, Spinner} from 'react-bootstrap';
import {FaTrash, FaInfoCircle, FaEdit, FaPlusSquare} from 'react-icons/fa'
//import {ModalData, useModal} from './ModalData';
//import { setSort } from '../actions/sort';
import {FaSortAmountUp, FaSortAmountDown} from 'react-icons/fa'
import {sources} from '../../settings/config'
import Swal from 'sweetalert2'
//import fetchCrudApi from '../actions/fetchCrudApi'

const MainTable = (
    {result, columns, handleShow, setData, fetchCrudApi, loading, setAction, setSort, children}) => {

    const style =  {
        //marg
        table:{
             maxWidth: '95%',
             justifyContent: 'center',
             marginTop: 45,
             marginLeft: 45,
             textAlign: 'center',         
        }   ,
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
        },
        tdLoading:{
            padding: 100
        },
        spinner:{
            width: 100, 
            height: 100
        }
    }
    //console.log(result, "pssed data");        
    console.log(columns.names.length, "COL LENGTH");
    return (
        <React.Fragment style={style}>
{/*         
            <Button variant='success'
                style={style.btnCreate}
                onClick={() => {                                    
                console.log("PUSHED BUTTON CREATE")
                handleShow()
                setAction('create')
            }}>
                <FaPlusSquare/>
                Create      
            </Button> */}
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
                                {columns.sortKey === field && 
                                columns.sortDirection === 'asc' ? 
                                <FaSortAmountUp className='ml-3'/> 
                                : 
                                <FaSortAmountDown className='ml-3'/>}
                            </th>  
                        ))}  
                        <th className='mr-5'>Actions</th>                  
                    </tr>
                </thead>
                <tbody>                    
                    { 
                    loading ?
                    <tr>
                        <td colSpan={columns.names.length + 1} style={style.tdLoading}>
                            <h1>Loading <Spinner animation="border" variant="dark" style={style.spinner}/></h1>
                        </td>  
                    </tr>
                    :                    
                    children}            
                </tbody>                               
            </Table>            
        </React.Fragment>         
    )
}
// const mapDispatchToProps = dispatch => ({
//     setSort: sortkey => dispatch(setSort(sortkey))
  
//   })
  
//export default connect(null, mapDispatchToProps)(MainTable)
export default memo(MainTable)