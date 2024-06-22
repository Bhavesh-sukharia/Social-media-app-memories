import * as api from '../api'; // Assume api.js contains API call functions
import { FETCH_USER, START_LOADING_USER, END_LOADING_USER } from '../constants/actionstype';

export const getUser = (username) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_USER });
        const { data } = await api.fetchUser(username); // Assume fetchUser is an API call
        dispatch({ type: FETCH_USER, payload: data });
        dispatch({ type: END_LOADING_USER });
    } catch (error) {
        console.error(error);
        dispatch({ type: END_LOADING_USER });
    }
};
