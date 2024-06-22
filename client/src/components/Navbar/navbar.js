import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, InputBase, Paper, Grid, useMediaQuery } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';

import useStyles from './style';
import { LOGOUT } from '../../constants/actionstype';
import UserAvatar from '../UserProfile/UserAvatar';

const Navbar = () => {
    const classes = useStyles();
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('xs'));
    const isTabScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch({ type: LOGOUT });
                history.push('/');
            }
        }
    }, [dispatch, history, user?.token, location]);

    return (
        <Grid item>
            <Box className={classes.navbar} component="nav">
                <Box className={classes.toolbar}>
                    <LogoSection isTabScreen={isTabScreen} />
                    {!isSmallScreen && <SearchBar />}
                    <ToolbarSection isSmallScreen={isSmallScreen} user={user} />
                </Box>
            </Box>
        </Grid>
    );
};

const LogoSection = ({ isTabScreen }) => {
    const classes = useStyles();

    return (
        <Box className={classes.logoSection}>
            <Link to='/home' className={classes.brandContainer}>
                {!isTabScreen && <img src={memoriesText} alt='icon' height='35px' />}
                <img className={classes.image} src={memoriesLogo} alt='icon' height='30px' />
            </Link>
        </Box>
    );
};

const SearchBar = () => {
    const classes = useStyles();
    const history = useHistory();

    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (search.trim()) {
            history.push(`/posts/search?searchQuery=${search || 'none'}`);
        }
    };

    return (
        <Box className={classes.searchBox}>
            <Paper component="form" className={classes.searchPaper} onSubmit={handleSubmit}>
                <InputBase
                    className={classes.inputBase}
                    placeholder="Search Memories"
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Box>
    );
};

const ToolbarSection = ({ isSmallScreen, user }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const logOut = () => {
        dispatch({ type: LOGOUT });
    }

    return (
        <Box className={classes.toolbarSection}>
            {isSmallScreen && (
                <IconButton className={classes.toolbarIcon}>
                    <SearchIcon />
                </IconButton>
            )}
            <IconButton className={classes.toolbarIcon} component={Link} to="/home">
                <HomeIcon />
            </IconButton>
            {user ? (
                <div>
                    <IconButton component={Link} to={`/user/${user.username}`}>
                        <UserAvatar width={30} height={30} username={user.username} />
                    </IconButton>
                    <Button component={Link} to='/home' variant='text' color='primary' onClick={logOut}>Log out</Button>
                </div>
            ) : (
                <div>
                    <Button component={Link} to='/auth/signup' variant='text' color='primary'>Sign Up</Button>
                    <Button component={Link} to='/auth' variant='text' color='primary'>Sign In</Button>
                </div>
            )}
        </Box>
    );
};

export default Navbar;
