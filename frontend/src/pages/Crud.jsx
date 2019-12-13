import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Title from '../components/Title'
import { withRouter } from 'react-router-dom';
import DataTables from '../components/DataTables'
import {ModalData, useModal} from '../components/ModalData'
import { sortData } from '../selectors/sortData';
import FormData from '../components/FormData';
import {setSort} from '../actions/sort'
import fetchCrudApi from '../actions/fetchCrudApi'
import {sources} from '../settings/config'


const Crud = ({result, fetchCrudApi, loading, sortKey, sortDirection, setSort}) => {

    const {show, handleShow, handleClose, data, setData} = useModal()

    const [action, setAction] = useState('list')

    
    
    useEffect(() => {
        

        fetchCrudApi(sources.dataAdmin,'get',null)
        console.log(action, "ACCION DE FROM ")
        
        }, [])


    
        
    return (
        <div>
            <Title/>
            <DataTables 
                result={result}
                columns={
                 {names:
                    [
                    'Name',
                    'Price',
                    'Quantity',
                    'Description',
                  
                ],
                sortKey,
                sortDirection
            }

            }
            handleShow={handleShow}
            setData={setData}
            loading={loading}
            setAction={setAction}
            fetchCrudApi={fetchCrudApi}
            setSort={setSort}
            />   
            <ModalData show={show} handleClose={handleClose} title={action}>
                {action === 'create' ?
                    <FormData data={{ name: '', price: '', quantity: '', description: ''}}
                    fetchCrudApi={fetchCrudApi}
                    action={'post'}   
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
