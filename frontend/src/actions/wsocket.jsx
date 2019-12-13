import {
    WS_CONNECT, WS_CONNECTING, WS_CONNECTED,
    WS_DISCONNECT, WS_DISCONNECTED, 
    WS_JOB_RECEIVED, WS_OTHERJOB_RECEIVED,
    WS_MESSAGE_RECEIVED, WS_MESSAGE_SENT, WS_ERROR
} from '../constants/action-types';
import socketIOClient from "socket.io-client";


export const ConnectWS = (wsUrl) => dispatch => {

    console.log(wsUrl, 'PREPARO COENXION A WS');
    
    dispatch({ type: WS_CONNECTING })
    
    const io = socketIOClient(wsUrl)

    console.log(io, 'este es conexion socket')
        
    io.on('connection', socket => {

    console.log(socket, 'este es socket conectado')
    dispatch({ type: WS_CONNECTED})
    })
    
    const message = {
        name: 'anonymous',
        message: 'PING'
        }
    
    io.emit('sendMessage', message, 
    //setWsStatus('Sending PING'),
    dispatch({ type: WS_MESSAGE_SENT, payload: message  })
    )

    io.on('showMessage', message => {
    //console.log(message, "FROM SERVER MESSAGE")
    console.log(message, "MENSAGE RECIBIDO WSSSSSSS");
    dispatch({
        type: WS_MESSAGE_RECEIVED,
        payload: message.message
    })

//        setWsStatus(message.message)
    })

    io.on('jobMessage', message => {
        //console.log(message, "FROM SERVER MESSAGE")
        console.log(message, "WEATHER JOB DATA");
        dispatch({
            type: WS_JOB_RECEIVED,
            payload: message.message
        })
    
    //        setWsStatus(message.message)
        })

    io.on('otherjobMessage', message => {
            //console.log(message, "FROM SERVER MESSAGE")
            console.log(message, "OTHER JOB SCRAP");
            dispatch({
                type: WS_OTHERJOB_RECEIVED,
                payload: message.message
            })
        
        //        setWsStatus(message.message)
            })



    io.on("disconnect", ()=>{ {
        //console.log("DESCONECTADO WSSSSSSS");
    dispatch({ type: WS_DISCONNECTED })
    //setWsStatus('disconnect')
}})    

    io.on('error', error => {
    dispatch({ type: WS_ERROR, payload: error })})





    
    
    
}

    //let wsconn = new WS(wsUrl)

    // wsconn.onopen = function (event) {


    //     //console.log("CONECTADO WSSSSSSS");
    //     wsconn.send(JSON.stringify({ message: 'CONNECTED FROM FRONTEND' }));
    //     dispatch({ type: WEBSOCKET_CONNECTED, payload: event.data })
    //     //   // send Subscribe/Unsubscribe messages here (see below)



    // }
    // wsconn.onmessage = function (event) {

    //     console.log("MENSAGE RECIBIDO WSSSSSSS");
    //     dispatch({
    //         type: WEBSOCKET_MESSAGE,
    //         payload: {
    //         }
    //     })


    // }

    // wsconn.onerror = function (event) {

    //     //console.log("ERRROR DE WSSSSSSS");

    //     dispatch({ type: WEBSOCKET_ERROR, payload: event.data })
    // }

    // wsconn.onclose = function (event) {

    
    // }



      