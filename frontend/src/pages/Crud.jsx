import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Title from '../components/Title'
import { withRouter } from 'react-router-dom';
import MainTable from '../components/tables/MainTable'
import CrudData from '../components/tables/CrudData'
import {ModalData, useModal} from '../components/ModalData'
import { sortData } from '../selectors/sortData';
import FormData from '../components/forms/FormData';
import {setSort} from '../actions/sort'
import fetchCrudApi from '../actions/fetchCrudApi'
import {sources, display} from '../settings/config'
import CreateButton from '../components/CreateButton';


// export const crudNamesCols = [
//     'Name',
//     'Price',
//     'Quantity',
//     'Description',
  
// ]

const Crud = ({result, fetchCrudApi, loading, sortKey, sortDirection, setSort}) => {

    const {show, handleShow, handleClose, data, setData} = useModal()
    const [action, setAction] = useState('list')
    const crudColumns = {
        names: display.crudNamesCols,
    sortKey,
    sortDirection
}
        
    useEffect(() => {
        
        fetchCrudApi(sources.dataAdmin,'get',null)
        //console.log(action, "Form action")
        }, [])

    return (
        <div>
            <Title content={'CRUD Example'}/>
            <CreateButton
                handleShow={handleShow}
                setAction={setAction}
            /> 
            <MainTable
                columns={crudColumns}
                handleShow={handleShow}
                loading={loading}
                setAction={setAction}
                setSort={setSort}
            >   
                <CrudData 
                    setData={setData}
                    fetchCrudApi={fetchCrudApi}
                    result={result}
                    colLength={crudColumns.names.length}
                    handleShow={handleShow}
                    setAction={setAction}
                />
            </MainTable>
            <ModalData show={show} handleClose={handleClose} title={action}>
                {   action === 'create' ?
                    <FormData data={{ name: '', price: '', quantity: '', description: ''}}
                        fetchCrudApi={fetchCrudApi}
                        action={'post'}
                        handleClose={handleClose}
                    />
                :    
                    action === 'update' && data ?
                    <FormData data={{ 
                        _id: data._id,
                        name: data.name, 
                        price: data.price, 
                        quantity: data.quantity, 
                        description: data.description}}
                        fetchCrudApi={fetchCrudApi}
                        handleClose={handleClose}
                        action={'patch'}   
                    />
                :                                
                    action === 'list' && data ? 
                <>
                    <p>{data.name}</p>
                    <p>{data.price}</p>
                </>    
                :
                    <p>NO DATA</p>
                }
            </ModalData>         
           
        </div>
    )
    }

    const mapStateToProps = (state) => ({
    result: sortData(state.example), 
    sortKey: state.example.sortKey,
    sortDirection: state.example.sortDirection,
    loading: state.example.loading, 
    auth: state.user
})

const mapDispatchToProps = dispatch => ({
    fetchCrudApi: (url, method, data) => dispatch(fetchCrudApi(url, method, data)),
    setSort: sortkey => dispatch(setSort(sortkey))
    })

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Crud))
