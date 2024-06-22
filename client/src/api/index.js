import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization =`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const fetchPost = (id) =>API.get(`/api/posts/${id}`);
export const fetchPosts = (query) => API.get(`/api/posts?${query}`);
export const createPosts = (newPost) => API.post('/api/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/api/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/api/posts/${id}`);
export const likePost = (id) => API.patch(`/api/posts/${id}/likePost`);
export const savePost = (id) => API.patch(`/api/posts/${id}/savePost`);
export const commentPost = (value, id) => API.post(`/api/posts/${id}/commentPost`, {value});

export const signIn = (formData) => API.post(`/api/auth/signin`, formData);
export const signUp = (formData) => API.post(`/api/auth/signup`, formData);

export const fetchUser = (username) => API.get(`/api/user/${username}`);


