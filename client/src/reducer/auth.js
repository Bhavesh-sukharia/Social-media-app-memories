import { AUTH, LOGOUT } from '../constants/actionstype';

const profile = JSON.parse(localStorage.getItem('profile'));

const initialState = {
  authData: profile ? profile : null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };
        case LOGOUT:
            localStorage.removeItem('profile');
            return { ...state, authData: null };
        default:
            return state;
    }
};

