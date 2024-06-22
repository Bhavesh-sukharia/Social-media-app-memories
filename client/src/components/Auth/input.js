import React from 'react';
import { Grid, IconButton, InputAdornment } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import useStyles from './style';

const Input = ({ name, handleChange, label, autoFocus, type, handleShowPassword, half, error, helperText }) => {
  const classes = useStyles();
  
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField 
        name={name}
        onChange={handleChange}
        variant='outlined'
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        error={error}
        helperText={helperText}
        InputProps={name === 'password' ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <Visibility style={{ color: '#fff' }} /> : <VisibilityOff style={{ color: '#fff' }} />}
              </IconButton>
            </InputAdornment>
          )
        } : null}
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        className={classes.inputRoot}
      />
    </Grid>
  );
}

export default Input;
