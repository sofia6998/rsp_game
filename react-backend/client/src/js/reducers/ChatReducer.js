import * as types from '../actions/actions-type';

const initialState = {
    messages: [],
};

//хранилище сообщений
const ChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.NEW_MSG :
            let arr = Array.from(state.messages);
            arr.push({
                userID: action.userID,
                text: action.text
            });
            return {
                ...state,
                messages: arr
            };
        default:
            return state;
    }
};

export default ChatReducer;