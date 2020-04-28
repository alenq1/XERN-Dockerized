import React, {memo} from 'react'
import {Table, Button, Spinner} from 'react-bootstrap';
import {FaTrash, FaInfoCircle, FaEdit, FaPlusSquare} from 'react-icons/fa'
import {FaSortAmountUp, FaSortAmountDown} from 'react-icons/fa'
import {sources, StyleSettings} from '../../settings/config'
import Swal from 'sweetalert2'
import styled from 'styled-components'


const StyledMainTable = styled.div`

margin: 2rem 2rem 2rem 4rem; 


table {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3); 
    max-width: 95%;
    justify-content: center;
    text-align: center;         
}

thead {
            
    background-color: black;
    color: white;
    
    }

@media screen and (max-width: ${StyleSettings.MaxDisplayMobile}) {

margin: 2rem 1rem; 

table {
    
    }

}

`

const MainTable = (
    {result, columns, handleShow, setData, fetchCrudApi, loading, setAction, setSort, children}) => {

    const style =  {
    

    }
    //console.log(result, "pssed data");        
    // console.log(columns.names.length, "COL LENGTH");
    return (
        <StyledMainTable>
            <Table  striped hover borderless responsive style={style.table}>
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
                        children
                    }            
                </tbody>                               
            </Table>            
        </StyledMainTable>         
    )
}
// const mapDispatchToProps = dispatch => ({
//     setSort: sortkey => dispatch(setSort(sortkey))
  
//   })
  
//export default connect(null, mapDispatchToProps)(MainTable)
export default MainTable