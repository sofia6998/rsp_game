import { combineReducers } from 'redux';
import GestureReducers from './gestures';
import gameReducer from './gameReducer';
import ChatReducer from "./ChatReducer";
import LinkReducer from './LinkReducer';

//комбинирование хранилищ в одно большое
const allReducers = combineReducers({
    gestures: GestureReducers,
    gameState: gameReducer,
    chatState: ChatReducer,
    link: LinkReducer

});

export default allReducers
