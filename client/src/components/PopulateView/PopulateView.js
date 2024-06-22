import React, { useEffect, useState, useCallback } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import Navbar from '../Navbar/navbar.js';
import Posts from '../PostsSection/PostsBrowse/Posts.js';
import RightBarSection from '../RightBarSection/RightBarSection.js';
import AddPost from '../PostsSection/AddPost/AddPost.js';
import User from '../UserProfile/User/User.js';
import { getUser } from '../../actions/User.js';
import PostDetails from '../PostDetails/PostDetails.jsx';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const PopulateView = () => {
    const query = useQuery();
    const searchQuery = query.get('searchQuery');
    const location = useLocation();

    const { username, postId } = useParams();
    const [filters, setFilters] = useState({
        search: searchQuery || '',
        sortBy: 'Recent',
        userName: username || '',
        view: postId ? 'post' : 'primary',
        type: 'posts'
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (username) {
            dispatch(getUser(username));
        }
    }, [dispatch, username]);

    useEffect(() => {
        const newFilters = {
            search: searchQuery || '',
            sortBy: 'Recent',
            userName: username || '',
            view: postId ? 'post' : 'primary',
            type: 'posts'
        };

        if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
            setFilters(newFilters);
        }
    }, [searchQuery, postId, filters, username, location]);

    const filteredPosts = useCallback(() => (
        <Posts filters={filters} />
    ), [filters]);

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Navbar />
                <Grid container justifyContent='space-between' alignItems='stretch' spacing={2}>
                    <Grid item xs={12} md={8}>
                        {postId ? (
                            <Grid container direction="column" spacing={1}>
                                <Grid item xs={12}>
                                    <PostDetails />
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid container direction="column" spacing={1}>
                                <Grid item xs={12}>
                                    {username ? <User filters={filters} setFilters={setFilters}/> : <AddPost />}
                                </Grid>
                                <Grid item xs={12}>
                                    {filteredPosts()}
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <RightBarSection filters={filters} setFilters={setFilters} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default PopulateView;
