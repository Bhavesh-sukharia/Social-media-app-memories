import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, IconButton, Typography, Avatar, CircularProgress, Tabs, Tab } from '@material-ui/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useHistory } from 'react-router-dom';
import useStyles from './style';

const UserProfile = ( { filters, setFilters } ) => {
    const { isLoading, data: user } = useSelector((state) => state.user);
    const history = useHistory();
    const classes = useStyles();

    if (isLoading) {
        return (
            <Grid item className={classes.root}>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                    <CircularProgress color="primary" />
                </Box>
            </Grid>
        )
    }

    const handleBackClick = () => {
        history.goBack();
    };

    const coverImage = `https://robohash.org/${user.username}?set=set2`;
    const profileImage = `https://robohash.org/${user.username}`;
    const date = new Date(user.createdAt);

    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const joinDate = `${month} ${year}`;

    return (
        <Grid item className={classes.root}>
            <Box className={classes.toolbar}>
                <IconButton onClick={handleBackClick} className={classes.backButton}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6">
                    {user.name}
                </Typography>
            </Box>
            <Grid item xs={12}>
                <Box position="relative" height="250px" overflow="hidden">
                    <img
                        src={coverImage}
                        alt="Cover"
                        className={classes.coverImage}
                    />
                    <Avatar
                        src={profileImage}
                        alt={user.username}
                        className={classes.avatar}
                    />
                </Box>
            </Grid>

            <Grid item xs={12} mt={6}>
                <Box className={classes.userDetails}>
                    <Typography variant="h6" ><b>{user.name}</b></Typography>
                    <Typography variant="body1" className={classes.userHandle}>@{user.username}</Typography>
                    {user.bio && (
                        <Typography variant="body1" className={classes.textGrey} mt={2}>{user.bio}</Typography>
                    )}
                    <Box display="flex" alignItems="center" mt={2}>
                        <CalendarTodayIcon fontSize="small" className={classes.textGrey} />
                        <Typography variant="body2" className={classes.date} ml={1}>
                            Joined {joinDate}
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            
            <UserProfileTabs filters={filters} setFilters={setFilters} />
        </Grid>
    );
};

const UserProfileTabs = ({ filters, setFilters }) => {
    const classes = useStyles();
    const [value, setValue] = useState(filters.type === 'liked' ? 1 : filters.type === 'saved' ? 2 : 0);

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
        const filterMap = ['posts', 'liked', 'saved'];
        const newType = filterMap[newValue];
        setFilters((prevFilters) => ({
            ...prevFilters,
            type: newType,
        }));
    }, [setFilters]);

    return (
        <Box className={classes.tabsContainer}>
            <Tabs 
                value={value} 
                onChange={handleChange} 
                centered
                variant="fullWidth"
                TabIndicatorProps={{ style: { backgroundColor: '#1976d2' } }}
                className={classes.tabs}
            >
                <Tab label="Posts" className={classes.tab} />
                <Tab label="Liked" className={classes.tab} />
                <Tab label="Saved" className={classes.tab} />
            </Tabs>
        </Box>
    );
};

export default UserProfile;
