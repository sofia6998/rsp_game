import * as types from '../actions/actions-type';

const initialState = {
    myGesture: undefined,
    opponentGesture: undefined,
    myScore: 0,
    hisScore: 0,
    myID: undefined,
    hisID: undefined,
    gameStarted: false,
    wait: false,
    animatedResult: ""
};

//статус игры и доп данные
const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.NO_GAME:
            return {
                myGesture: undefined,
                opponentGesture: undefined,
                myScore: 0,
                hisScore: 0,
                myID: undefined,
                hisID: undefined,
                gameStarted: false,
                wait: false,
                animatedResult: ""
            };
        case types.GAME_START:
            return {
                ...state,
                myID: action.myID,
                hisID: action.hisID,
                gameStarted: true
            };
        case types.NEW_ROUND:
            return {
                ...state,
                myGesture: undefined,
                opponentGesture: undefined,
                wait: false,
                animatedResult: ""
            };
        case types.GESTURE_SELECTED:
            return {
                ...state,
                myGesture: action.gesture,
                wait: true
            };

        case types.RESULT_OF_ROUND:
            if (action.winner === state.myID) {
                return {
                    ...state,
                    opponentGesture: action.looseG,
                    myScore: (++state.myScore),
                    animatedResult: "Победа!"
                };
            }
            return {
                ...state,
                opponentGesture: action.winG,
                hisScore: (++state.hisScore),
                animatedResult: "Проигрыш :("
            };
        case types.NO_WINNER:
            return {
                ...state,
                opponentGesture: state.myGesture,
                animatedResult: "ничья"
            };
        default:
            return state;
    }
};

export default gameReducer;