import {
    WS_CONNECT, WS_CONNECTING, WS_CONNECTED,
    WS_DISCONNECT, WS_DISCONNECTED, 
    WS_JOB_RECEIVED, WS_OTHERJOB_RECEIVED,
    WS_MESSAGE_RECEIVED, WS_MESSAGE_SENT, WS_ERROR
} from '../constants/action-types';

const initialState = {
    //
    wsData: {
        message: null,
        job: [],
        otherjob: []
    },
    error: '',
    status: 'disconnected'
};

const WSocketReducer = (state = initialState, action) => {
    //console.log(action.payload, "action payload value")

    switch (action.type) {
        case WS_CONNECTING:
            return {
                ...state,
                status: 'connecting'
            };
        case WS_CONNECTED:
            return {
                ...state,
                status: 'connected'
            };

        case WS_MESSAGE_SENT:
            return {
                ...state,
                //wsData: action.payload,
                status: `${action.payload} message sent `
            };

        case WS_MESSAGE_RECEIVED:
            return {
                ...state,
                wsData: {
                    ...state.wsData,
                    message: action.payload
                },
                status: 'message received'
            };

        case WS_JOB_RECEIVED:
            return {
                ...state,
                wsData: {
                    ...state.wsData,
                    job: action.payload
                },
                status: 'message received'
            };

        case WS_OTHERJOB_RECEIVED:
            return {
                ...state,
                wsData: {
                    ...state.wsData,
                    otherjob: action.payload
                },
                status: 'message received'
            };
    
        case WS_DISCONNECTED:
            return {
                ...state,
                status: 'disconnected'
            };

        case WS_ERROR:
            return {
                ...state,
                error: action.payload,
                status: 'error'
            };

        default:
            return state;
    }
};

export default WSocketReducer;
