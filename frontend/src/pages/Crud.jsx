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
import {sources, display, StyleSettings} from '../settings/config'
import CreateButton from '../components/buttons/CreateButton';
import Loading from '../components/Loading';   
import styled from 'styled-components'


const StyledCrud = styled.div`

    .create-button {
        margin: 0% 45%;
    }


@media screen and (max-width: ${StyleSettings.MaxDisplayMobile}) {

    h1 {
        font-size: 1.5rem;
    }

    .create-button {
        margin: 5% 35%;
    }

    .main-table {

        font-size: .75rem;

        table {
            margin: 0;
        }
    }
}
`

// export const crudNamesCols = [
//     'Name',
//     'Price',
//     'Quantity',
//     'Description',
// ]


const Crud = ({result, fetchCrudApi, loading, sortKey, sortDirection, setSort, auth, history}) => {

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

        <StyledCrud>
            {loading === true ? <Loading message={'Loading'}/>
                :
            <div>            
                <Title content={'CRUD Example'}/>
            <div className="create-button">
                <CreateButton
                    handleShow={handleShow}
                    setAction={setAction}
                /> 
            </div>
            <div className="main-table">
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
            </div>
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
                        name: data.name, 
                        price: data.price, 
                        quantity: data.quantity, 
                        description: data.description}}
                        fetchCrudApi={fetchCrudApi}
                        handleClose={handleClose}
                        action={'patch'}
                        idparam={data._id}
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
        }
    </StyledCrud>
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
