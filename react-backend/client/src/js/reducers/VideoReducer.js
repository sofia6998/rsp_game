import * as types from '../actions/actions-type';

const initialState = {
    callIsOn: false,
    first: false,
    invite: false,
    myStream: undefined,
    remoteStream: undefined
};

const VideoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SEND_PHONE_CALL: {
            return {
                ...state,
                isInitiator: action.isInitiator,
                isStarted: action.isStarted,
                myStream: action.myStream,

            };
        }

        case types.GET_PHONE_CALL: {
            return {
                ...state,
                offer: action.offer,
            };
        }

        case types.START_PHONE_CALL: {
            return {
                ...state,
                offer: action.offer,
                isStarted: action.isStarted,
                myStream: action.myStream,
                remoteStream: action.remoteStream,
            };
        }

        case types.END_PHONE_CALL: {
            return {
                ...state,
                offer: action.offer,
                isInitiator: action.isInitiator,
                isStarted: action.isStarted,
                myStream: action.myStream,
                remoteStream: action.remoteStream,
            };
        }
        case 'sdcd':
            return null;
        case types.INCOME_CALL:
            return {
                ...state,
                invite: true
            };
        case types.ANSWER:
            return {
                ...state,
                callIsOn:true,
                invite:false
            };
        default:
            return state;
    }
};

export default VideoReducer;