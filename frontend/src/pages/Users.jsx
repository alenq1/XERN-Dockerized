import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Title from '../components/Title'
import { withRouter } from 'react-router-dom';
import MainTable from '../components/tables/MainTable'
import UserData from '../components/tables/UserData'
import {ModalData, useModal} from '../components/ModalData'
import { sortData } from '../selectors/sortData';
import FormData from '../components/forms/FormData';
import {setSort} from '../actions/sort'
import fetchCrudApi from '../actions/fetchCrudApi'
import {sources, display, StyleSettings} from '../settings/config'
import Loading from '../components/Loading'
import styled from 'styled-components'

const StyledUsers = styled.div`

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

const Crud = ({result, fetchCrudApi, loading, sortKey, sortDirection, setSort}) => {

    const {show, handleShow, handleClose, data, setData} = useModal()
    const [action, setAction] = useState('list')
    const usersColumns = {
        names:display.usersNamesCols,
        sortKey,
        sortDirection
    }
    
        useEffect(() => {
        
        fetchCrudApi(sources.UsersUrl,'get',null)
        //console.log(action, "Form action")
        }, [])
        

    return (

        <StyledUsers>
        {loading === true ? <Loading message={'Loading'}/>
        :
        <div>
            <Title content={'Users List'}/>
            <div className="main-table">
                <MainTable
                    columns={usersColumns}
                    handleShow={handleShow}
                    loading={loading}
                    setAction={setAction}
                    setSort={setSort}
                >   
                    <UserData 
                        setData={setData}
                        fetchCrudApi={fetchCrudApi}
                        result={result}
                        colLength={usersColumns.names.length}
                        handleShow={handleShow}
                        setAction={setAction}
                    />
                </MainTable>
            </div>
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
                            description: data.description
                        }}
                        fetchCrudApi={fetchCrudApi}
                        action={'patch'}   
                        />
                :                                
                action === 'list' && data ? 
                <>
                    <p>{data.username}</p>
                    <p>{data.role}</p>
                    <p>{data.created}</p>
                </>    
                :
                    <p>NO DATA</p>
                }
            </ModalData>         
        </div>
}
        </StyledUsers>
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
