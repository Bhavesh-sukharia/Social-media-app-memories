import * as api from '../api';
import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, CREATE, UPDATE, DELETE } from '../constants/actionstype'

//Action Creators
export const getPost = (id) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING});

        const { data } = await api.fetchPost(id);

        dispatch({ type : FETCH_POST, payload : data});

        dispatch({type: END_LOADING});
    }
    catch(error) {
        console.log(error);
    }
}

export const getPosts = (filters) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING});

        const queryString = new URLSearchParams(filters).toString();
                
        const { data } = await api.fetchPosts(queryString);

        dispatch({ type : FETCH_ALL, payload : data});

        dispatch({type: END_LOADING});
    }
    catch(error) {
        console.log(error);
    }
}

export const createPosts = (post, history) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING});

        const { data } = await api.createPosts(post);

        history.push(`/post/${data._id}`)

        dispatch({ type : CREATE, payload : data});
        dispatch({type: END_LOADING});
    }
    catch(error) {
        console.log(error);
    }
}

export const updatePost = (id , post) => async (dispatch) => {
    try{

        const { data } = await api.updatePost(id, post);

        dispatch({ type : UPDATE, payload : data})
    }
    catch(error){
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        await api.deletePost(id);

        dispatch({ type : DELETE, payload : id})
    }
    catch(error){
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try{
        const { data } = await api.likePost(id);

        dispatch({ type : UPDATE, payload : data})
    }
    catch(error){
        console.log(error);
    }
}

export const savePost = (id) => async (dispatch) => {
    try{
        const { data } = await api.savePost(id);

        dispatch({ type : UPDATE, payload : data})
    }
    catch(error){
        console.log(error);
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try{
        const { data } = await api.commentPost(value, id);

        dispatch({ type : UPDATE, payload : data});

        return data.comments;
    }
    catch(error){

    }
}