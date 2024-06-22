import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../PostsBrowse/Post/Post.js';
import { Grid, CircularProgress, Box, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import useStyles from './style.js';
import { getPosts } from '../../../actions/Posts.js';

const Posts = ({ filters }) => {
    const classes = useStyles();
    const { isLoading, posts } = useSelector((state) => state.posts);
    const user = JSON.parse(localStorage.getItem('profile'));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts(filters));
    }, [dispatch, filters]);

    if (!isLoading && (posts == null || !posts.length)) {
        return (
            <Box className={classes.messageBox}>
                <Typography className={classes.message}>
                It seems like there are no posts here.
                </Typography>
            </Box>
        )
    }

    return (
        isLoading ? (
            <Box className={classes.messageBox}>
                <CircularProgress color="primary" />
            </Box>
        ) : (
            <Stack spacing={1}>
                {posts.map((post) => (
                    <Grid key={`${post._id} ${filters.type}`} item xs={12}>
                        <Post post={post} currentUser={user} />
                    </Grid>
                ))}
            </Stack>
        )
    );
};

export default React.memo(Posts);