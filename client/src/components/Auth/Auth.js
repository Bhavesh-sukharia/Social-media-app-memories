import React, { useState } from 'react';
import { LockOutlined } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import useStyles from './style';
import { Avatar, Button, Container, Grid, Typography } from '@material-ui/core';
import Input from './input';
import { Link, useHistory } from 'react-router-dom';
import { signIn, signUp } from '../../actions/Auth';
import { Stack } from '@mui/material';
import memoriesText from '../../images/memoriesText.png';
import { ErrorAlert } from '../System/AlertMessage';
import PasswordStrength from './checkPasswordStrenth';
import { isLength, isEmail, contains } from 'validator';

const Auth = ({ register }) => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(register);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', userName: '', email: '', password: '', confirmPassword: '' });
  const [errorData, setErrorData] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length !== 0) return;

    if (isSignUp) {
      dispatch(signUp(formData, history, setErrorData));
    } else {
      dispatch(signIn(formData, history, setErrorData));
    }
  };

  const validate = () => {
    const errors = {};

    if (isSignUp && !isLength(formData.userName, { min: 6, max: 30 })) {
      errors.userName = 'Must be between 6 and 30 characters long';
    }

    if (isSignUp && contains(formData.userName, ' ')) {
      errors.userName = 'Must contain only valid characters';
    }

    if (!isLength(formData.password, { min: 8 })) {
      errors.password = 'Must be at least 8 characters long';
    }

    if (!isEmail(formData.email)) {
      errors.email = 'Must be a valid email address';
    }

    if (isSignUp && errors.password === undefined && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }

    setFormErrors(errors);

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'password') {
      setPassword(value);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleShowPassword = () => setShowPassword((previousShowPassword) => !previousShowPassword);

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  return (
    <Container component='main' maxWidth='xs' className={classes.container}>
      <Stack alignItems='center'>
        <Link to='/'>
          <img src={memoriesText} alt='icon' height='45px' className={classes.image} />
        </Link>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant='h5' className={classes.whiteText}>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
              </>
            )}
            {isSignUp && (
              <Input name='userName' label='Username' handleChange={handleChange} error={formErrors.userName !== undefined} helperText={formErrors.userName} />
            )}
            <Input name='email' label='Email Address' handleChange={handleChange} type='email' error={formErrors.email !== undefined} helperText={formErrors.email} />
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
              error={formErrors.password !== undefined}
              helperText={formErrors.password}
            />
            {isSignUp && (
              <>
                <PasswordStrength password={password} />
                <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' error={formErrors.confirmPassword !== undefined} helperText={formErrors.confirmPassword} />
              </>
            )}
            <Grid item xs={12} sm={12}>
              <ErrorAlert fullWidth error={errorData} />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container justifyContent='center'>
            <Grid item>
              <Button onClick={switchMode} className={classes.switchModeButton}>
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </Container>
  );
};

export default Auth;
