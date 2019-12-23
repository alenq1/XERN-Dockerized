import React, {memo} from 'react'
//import {connect} from 'react-redux'
import {Table, Button} from 'react-bootstrap';
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

        margin: 20,
        //marg
        table:{
            marginTop: 45,
            marginLeft: 20,
            marginRight: 200, 
            textAlign: 'center'
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
        }
    }
    //console.log(result, "pssed data");        
    return (
        <>
            <Button variant='success'
                style={style.btnCreate}
                onClick={() => {                                    
                console.log("PUSHED BUTTON CREATE")
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
                    {children}            
                </tbody>                               
            </Table>            
        </>         
    )
}
// const mapDispatchToProps = dispatch => ({
//     setSort: sortkey => dispatch(setSort(sortkey))
  
//   })
  
//export default connect(null, mapDispatchToProps)(MainTable)
export default memo(MainTable)