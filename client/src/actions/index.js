import streamsAPI from '../apis/streams'; 
import history from '../history';

import { 
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM, 
    DELETE_STREAM,
    EDIT_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS 
} from './types';


export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streamsAPI.post('/streams', { ...formValues, userId });
    
    dispatch({
        type: CREATE_STREAM,
        payload: response.data
    });
    
    // Navigate back to the list of streams (...the root route)
    history.push('/');
};

export const fetchStreams = () => async dispatch => {
    const response = await streamsAPI.get('/streams');
    
    dispatch({
        type: FETCH_STREAMS,
        payload: response.data
    });
};

export const fetchStream = (id) => async dispatch => {
    const response = await streamsAPI.get(`/streams/${id}`);
    
    dispatch({
        type: FETCH_STREAM,
        payload: response.data
    });
};

export const editStream = (id, formValues) => async dispatch => {
    // Use patch instead of put, so that userId property is not dropped off
    // - patch : replace just the properties that match the formValues that 
    //           are passed ... leave everything else in place
    // - put : replace all the properties with the formValues that are passed
    //         if formValues doesn't contain a property it will be dropped
    const response = await streamsAPI.patch(`/streams/${id}`, formValues);
    
    dispatch({
        type: EDIT_STREAM,
        payload: response.data
    });

    // Navigate back to the list of streams (...the root route)
    history.push('/');
};

export const deleteStream = (id) => async dispatch => {
    await streamsAPI.delete(`/streams/${id}`);
    
    dispatch({
        type: DELETE_STREAM,
        payload: id
    });
    
    // Navigate back to the list of streams (...the root route)
    history.push('/');
};