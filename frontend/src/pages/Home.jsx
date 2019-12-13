import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import fetchCrudApi from '../actions/fetchCrudApi'
//import {ConnectWS} from '../actions/wsocket';
import {exampleSelector} from '../selectors/exampleSelector'
import socketIOClient from "socket.io-client";
import {sources} from '../settings/config'
import Result from '../components/Result'
import { Card, Spinner} from 'react-bootstrap'


const Home = ({fetchCrudApi, result, websocket}) => {


   const style = {
        //justifyContent: 'center',
        //width: 450,
        marginRight: 35,
        //marginTop: 100,
        
        title:{
            textAlign: 'center',
            marginTop: 50
        },
        card:{
            marginRight: 50,
            marginLeft: 85,
            marginTop: 50,
            textAlign: 'center'
        },
    }

    
    //const [websocket, setWsStatus] = useState('checking...')
    const [healthCheck, setHealthCheck] = useState('checking...')
    const [homeLoading, sethomeLoading] = useState(false)
    const [backendApiData, setBackendData] = useState('')
    
    
    // const checkWebsocket = (wsUrl) => {
        
    //     const io = socketIOClient(wsUrl)
    //     console.log(io, 'este es socket')
        
    //     io.on('connection', setWsStatus('Sending PING'))
        
    //     io.emit('sendMessage', {
    //             name: 'anonymous',
    //             message: 'PING'
    //             }, 
    //         setWsStatus('Sending PING')
    //         )
    //     io.on('showMessage', message => {
    //         //console.log(message, "FROM SERVER MESSAGE")
    //         setWsStatus(message.message)
    //         })
    
    //     io.on("disconnect", ()=>{ {setWsStatus('disconnect')}})    
        
    // }


    


    const checkApiHealth = (Url) => {

        if(Url === sources.HealthEndpoint){
            fetch(Url)
            .then((response) => {
                setHealthCheck(response.statusText)
                console.log(healthCheck, "ESTADO DE HEALTHCHECK");
            })
        
            .catch((error) => {setBackendData('error')})
        }
        if(Url === sources.checkApiUrl){
            sethomeLoading(true)
            fetch(Url)
            .then(response => response.json())
            .then(jsonres => {    
                console.log(jsonres, "RESPUESTA DE API");
                sethomeLoading(false)
                setBackendData(jsonres)
                console.log(backendApiData, "ESTADO DE API  DE BACKEND");
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
        
        <>
        <h1 style={style.title}>Services Check</h1>
        
        <div className='row container-fluid'>
            
            <Card style={style.card}>
                <Card.Header>Api Endpoint State</Card.Header>
                <Card.Body>
                
                {   healthCheck === 'OK' ? 
                        <h2 className='text-success'>{healthCheck}</h2> 
                        : 
                        <h2 className='text-danger'>{healthCheck}</h2> 
                }
                
                </Card.Body>
            </Card>
            
        
                <Card style={style.card}>
                <Card.Header>Websocket State</Card.Header>
                <Card.Body>

            
                
                    {
                    websocket.status === 'connected' ||  websocket.wsData === 'Receiving PONG' ? 
                    <h3 className='text-success'>{websocket.wsData}</h3> 
                        : 
                    <h3 className='text-danger'>{websocket.status}</h3> 
                    }
                </Card.Body>
                </Card>
            
                <Card style={style.card}>
                <Card.Header>Scheduled Tasks</Card.Header>
                <Card.Body>

                        <a className="btn btn-primary mt-2" role="button" href={sources.taskMonitor}>
                            check tasks
                        </a>
                </Card.Body>
                </Card>

                <Card style={style.card}>
                <Card.Header>Crud Example Page</Card.Header>
                <Card.Body>

                
                        <a className="btn btn-primary mt-2" role="button" href='/list'>
                            go to page
                        </a>
                </Card.Body>
                </Card>
                
                <Card style={style.card}>
                <Card.Header>Socket/Scraper Example Page</Card.Header>
                <Card.Body>

                
                        <a className="btn btn-primary mt-2" role="button" href='/example'>
                            go to page
                        </a>
                </Card.Body>
                </Card>


            
        </div>
        <Card style={style.card}>
                <Card.Header>Backend Api request</Card.Header>
                <Card.Body>

                
                
                    <button type="button" className="btn btn-primary mt-2"
                            onClick={() => checkApiHealth(sources.checkApiUrl)}>
                        check Request        
                    </button>    
                    {    
                        !backendApiData.data  &&
                        null
                    
                    }        
                    
                    {    
                        homeLoading === true &&
                        <div className='mt-3'>
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

            
                </Card.Body>
                </Card>
        </>
    )
}


const mapStateToProps = state => {
    return {
      result: state.example,
      websocket: state.socketdata
    }
  }
  

export default connect(mapStateToProps, { fetchCrudApi })(withRouter(Home))
