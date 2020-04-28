import React, {useEffect, useState, useCallback} from 'react'
import {connect} from 'react-redux'
import { withRouter, Link, NavLink } from 'react-router-dom';
import fetchCrudApi from '../actions/fetchCrudApi'
//import {ConnectWS} from '../actions/wsocket';
import {exampleSelector} from '../selectors/exampleSelector'
import socketIOClient from "socket.io-client";
import {sources, StyleSettings} from '../settings/config'
import Result from '../components/Result'
import { Card, Spinner, Button} from 'react-bootstrap'
import CardTemplate from '../components/CardTemplate';
import styled from 'styled-components';
import {FaNotesMedical, FaBusinessTime, FaThList, FaUsersCog, FaGlobeAmericas, FaNetworkWired, FaCubes} from 'react-icons/fa'


const StyledHome = styled.div`


h1{
    margin:  2rem auto;
    text-align: center;
}

.card-list {
    display: flex;
}

h2 {
    padding: 1rem 0 0 1rem;
}

@media screen and (max-width: ${StyleSettings.MaxDisplayMobile}) {

    h1{
    margin:  1rem auto;
    font-size: 2rem;
}

    .card-list {
    flex-wrap: wrap;
    margin: 0;
}
    h2{
        font-size: 1rem;
    }
}
`

const Home = ({fetchCrudApi, result, websocket, history}) => {


    //const [websocket, setWsStatus] = useState('checking...')
    const [healthCheck, setHealthCheck] = useState('checking...')
    const [homeLoading, sethomeLoading] = useState(false)
    const [backendApiData, setBackendData] = useState('')
    const checkApiHealth = (Url) => {

        if(Url === sources.HealthEndpoint){
            fetch(Url)
            .then((response) => {
                setHealthCheck(response.statusText)
                // console.log(healthCheck, "HEALTHCHECK STATEzzzz");
            })
        
            .catch((error) => {setBackendData('error')})
        }
        if(Url === sources.checkApiUrl){
            sethomeLoading(true)
            fetch(Url)
            .then(response => response.json())
            .then(jsonres => {    
                console.log(jsonres, "api response");
                sethomeLoading(false)
                setBackendData(jsonres)
                console.log(backendApiData, "backend api state");
            })
            .catch((error) => {
                sethomeLoading(false)
                setBackendData('error')            
        })
            
            }
    }

    useEffect(() => {   
        //checkWebsocket(sources.WSocket)
//        ConnectWS(sources.WSocket)
        checkApiHealth(sources.HealthEndpoint)
    }, [])

    return (
        <StyledHome>
            <h1>Services Check</h1>            
            <div className='card-list'>                
                <CardTemplate title={'Endpoint Health'} 
                customStyle={ healthCheck === 'OK' ? 'healthy' : 'error'}                
                >
                        <FaNotesMedical onClick={() => checkApiHealth(sources.HealthEndpoint)}/>
                        <h2>{healthCheck}</h2>
                </CardTemplate>
                <CardTemplate title={'Scheduled Tasks'} customStyle="normal-content">                        
                            <a href={sources.taskMonitor}>
                                <FaBusinessTime/>
                            </a>                        
                </CardTemplate>
                <CardTemplate title={'Crud Example'} customStyle="normal-content">                   
                            <Link to='/list'>
                                <FaThList />                                
                            </Link>
                </CardTemplate>
                <CardTemplate title={'Users Admin'} customStyle="normal-content">
                    <Link to='/users'>
                        <FaUsersCog/>
                    </Link>        
                </CardTemplate>
                <CardTemplate title={'Socket/Scraper Example'} customStyle="normal-content">
                    <Link to='/example'>
                        <FaGlobeAmericas/>                        
                    </Link>
                </CardTemplate>
            </div>
            <div className='card-list'>
                <CardTemplate title ={'Websocket State'} customStyle={websocket.status === 'connected' ||  websocket.status === 'message received' ? 
                                    'healthy' : 'error'}>
                        <FaNetworkWired/>                        
                        <h2>{websocket.status}</h2>
                </CardTemplate>            
                
                <CardTemplate title={'Backend Api request'} customStyle='api-request'>
                        <FaCubes onClick={() => checkApiHealth(sources.checkApiUrl)}/>
                        {    
                            !backendApiData.data  &&
                            null                    
                        }        
                        {    
                            homeLoading === true &&
                            <div >
                                <Card.Header>
                                    <Spinner animation="border" role="status" variant='dark'/>
                                    Loading
                                </Card.Header>
                            </div>
                        }
                        {
                            backendApiData.message && 
                            <Result type='Success' message={JSON.stringify(backendApiData.message, null, 2)}/>                        
                        }
                        
                        {   (backendApiData.error && backendApiData.error.message) &&
                            <Result type='Error' message={backendApiData.error.message}/>
                        }                    
                </CardTemplate>                
            </div>
        </StyledHome>
    )
}

const mapStateToProps = state => {
    return {
        result: state.example,
        websocket: state.socketdata
    }
}

export default connect(mapStateToProps, { fetchCrudApi })(withRouter(Home))
