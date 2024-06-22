import { combineReducers } from 'redux';

import posts from './Posts';
import auth from './auth';
import user from './User'

export default combineReducers({
    posts,
    auth,
    user
});