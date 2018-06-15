import * as types from '../actions/actions-type';
import {NO_GAME} from "../actions/actions-type";


const LinkReducer = (state = null, action) => {
    switch (action.type) {
        case types.LINK_CREATED :
            return action.link;
        case NO_GAME:
            return null;
        default:
            return state;
    }
};

export default LinkReducer;