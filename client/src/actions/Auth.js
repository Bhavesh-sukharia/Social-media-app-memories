import * as api from '../api';
import { AUTH } from '../constants/actionstype'


export const signIn = (formData, history, setErrorData) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({type: AUTH, data});
        history.push('/');
    }catch(error) {
        setErrorData(error.response.data.error);
    }
}

export const signUp = (formData, history, setErrorData) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData);

        dispatch({type: AUTH, data});
        history.push('/');
    }catch(error) {
        setErrorData(error.response.data.error);
    }
}