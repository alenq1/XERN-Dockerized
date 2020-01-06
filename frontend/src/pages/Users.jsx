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
import {sources, display} from '../settings/config'
import CreateButton from '../components/CreateButton';


// export const usersNamesCols =     [
//     'Name',
//     'Mail',
//     'Role',
//     'Status',
//   ]

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
        <div>
            <Title content={'Users List'}/>
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
                    <p>{data.username}</p>
                    <p>{data.role}</p>
                    <p>{data.created}</p>
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
