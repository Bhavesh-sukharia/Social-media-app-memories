import React from 'react';
import { Container, useMediaQuery, ThemeProvider, createTheme } from '@material-ui/core'; 
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import PopulateView from './components/PopulateView/PopulateView.js';
import Auth from './components/Auth/Auth.js';


const App = () => {
    const theme = createTheme();
    const user = JSON.parse(localStorage.getItem('profile'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    
    return (
        <GoogleOAuthProvider clientId=''>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Container maxWidth={isSmallScreen ? 'sm' : 'md'}>
                        <Switch>
                            <Route path='/' exact component={() => <Redirect to='/home' />} />
                            <Route path='/home' exact component={PopulateView} />
                            <Route path='/user/:username' exact component={PopulateView} />
                            <Route path='/posts/search' exact component={PopulateView} />
                            <Route path='/post/:postId' exact component={PopulateView} />
                            <Route path='/auth' exact component={() => (user ? <Redirect to='/home' /> : <Auth register={false} />)} />
                            <Route path='/auth/signup' exact component={() => (user ? <Redirect to='/home' /> : <Auth register={true} />)} />
                        </Switch>
                    </Container>
                </BrowserRouter>
            </ThemeProvider>
        </GoogleOAuthProvider>
    )
}

export default App;