import { FETCH_USER, START_LOADING_USER, END_LOADING_USER } from '../constants/actionstype';

const initialState = { isLoading: true, data: null };

export default (state = initialState, action) => {
    switch (action.type) {
        case START_LOADING_USER:
            return { ...state, isLoading: true };
        case END_LOADING_USER:
            return { ...state, isLoading: false };
        case FETCH_USER:
            return { ...state, data: action.payload, isLoading: false };
        default:
            return state;
    }
};
