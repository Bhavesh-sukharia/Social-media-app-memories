import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE } from '../constants/actionstype'

const initialState = {
    post: null,
    isLoading: false,
    posts: [],
    error: null,
  };
export default (state = initialState, action) => {
    switch(action.type) {
        case START_LOADING :
            return { ...state, isLoading: true, error: null, post: null };
        case END_LOADING :
            return { ...state, isLoading: false };
        case FETCH_ALL :
            return {
                ...state,
                posts : action.payload.data,
                currentPage: action.payload.currentPage,
                numberofPages:  action.payload.numberOfPages,
            };
        case FETCH_POST :
            return { ...state, post: action.payload }
        case FETCH_BY_SEARCH :
            return {...state, posts: action.payload };
        case CREATE :
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE :
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case DELETE :
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default :
            return state;
    }
}