import _ from 'lodash';

import { 
    CREATE_STREAM, 
    FETCH_STREAMS, 
    FETCH_STREAM, 
    EDIT_STREAM, 
    DELETE_STREAM 
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case FETCH_STREAM:
        case CREATE_STREAM:
        case EDIT_STREAM:
            // **** Long-hand approach
            // const newState = { ...state };      // Create copy of existing state
            // // id is the key of the state object
            // newState[action.payload.id] = action.payload;
            // return newState;
            
            // **** Short-hand approach using ES6 syntax
            return { ...state, [action.payload.id]: action.payload };
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};