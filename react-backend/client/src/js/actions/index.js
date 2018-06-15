import * as types from '../actions/actions-type';
//СОБЫТИЯ


//начало игры
export const startGame = (data) => {
    return {
        type: types.GAME_START,
        myID: data.myID,
        hisID: data.hisID
    }
};

//выход из игры
export const exitGame = () => {
    return{
        type: types.NO_GAME
    }
};

//ссылка создана
export const linkCreated = (link) => {
    return {
        type: types.LINK_CREATED,
        link: link
    }
};

//выбор  жеста
export const selectGesture = (gesture) => {
    return {
        type: types.GESTURE_SELECTED,
        gesture: gesture
    }
};

//начало нового раунда
export const newRound = () => {
    return {
        type: types.NEW_ROUND
    }
};

//результаты раунда
export const roundResult = (data) => {
    if (data.winner) {
        return {
            type: types.RESULT_OF_ROUND,
            winner: data.winner,
            winG: data.winG,
            looseG: data.looseG
        }
    }
    return {
        type: types.NO_WINNER
    }
};

//добавление нового сообщения
export const addNewMsg = (data) => {
    return {
        type: types.NEW_MSG,
        text: data.text,
        userID: data.userID
    }
};


//для видеочаа

export function getCall(data) {
    return {
        type: types.GET_PHONE_CALL,
        offer: data.offer,
    }
}

export function sendPhoneCall(data) {
    return {
        type: types.SEND_PHONE_CALL,
        isInitiator: data.isInitiator,
        isStarted: data.isStarted,
        myStream: data.myStream,
    }
}


export function startCall(data) {
    return {
        type: types.START_PHONE_CALL,
        isStarted: data.isStarted,
        offer: data.offer,
        myStream: data.myStream,
        remoteStream: data.remoteStream,

    }
}


export function endCall(data) {
    return {
        type: types.END_PHONE_CALL,
        isStarted: data.isStarted,
        isInitiator: data.isInitiator,
        offer: data.offer,
        myStream: data.myStream,
        remoteStream: data.remoteStream,

    }
}




