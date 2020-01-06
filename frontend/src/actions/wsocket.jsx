import {
    WS_CONNECT, WS_CONNECTING, WS_CONNECTED,
    WS_DISCONNECT, WS_DISCONNECTED, 
    WS_JOB_RECEIVED, WS_OTHERJOB_RECEIVED,
    WS_MESSAGE_RECEIVED, WS_MESSAGE_SENT, WS_ERROR
} from '../constants/action-types';
import socketIOClient from "socket.io-client";


export const ConnectWS = (wsUrl) => dispatch => {

    //console.log(wsUrl, 'WS CONNECTING');
    
    dispatch({ type: WS_CONNECTING })
    
    const io = socketIOClient(wsUrl)

    //console.log(io, 'this is socket connection')
        
    io.on('connection', socket => {

    //console.log(socket, 'this a connected socket')
    dispatch({ type: WS_CONNECTED})
    })
    
    const message = {
        name: 'anonymous',
        message: 'PING'
        }
    
    io.emit('sendMessage', message, 
        dispatch({ type: WS_MESSAGE_SENT, payload: message  })
    )

    io.on('showMessage', message => {
    //console.log(message, "FROM WSSOCKET SERVER MESSAGE")
        dispatch({
            type: WS_MESSAGE_RECEIVED,
            payload: message.message
        })
    })

    io.on('jobMessage', message => {
        //console.log(message, "WEATHER JOB DATA");
        dispatch({
            type: WS_JOB_RECEIVED,
            payload: message.message
        })
    })

    io.on('otherjobMessage', message => {
            //console.log(message, "OTHER JOB SCRAP");
        dispatch({
            type: WS_OTHERJOB_RECEIVED,
            payload: message.message
        })        
    })

    io.on("disconnect", ()=>{ {
        //console.log("WS DISCONNECTED");
        dispatch({ type: WS_DISCONNECTED })
    }})    

    io.on('error', error => {
        dispatch({ type: WS_ERROR, payload: error })
    })    
    
}
