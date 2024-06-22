import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: '#000',
    color: '#fff',
  },
  container: {
    marginTop: theme.spacing(6),
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '8px',
    padding: theme.spacing(2),
  },
  image: {
    marginBottom: theme.spacing(6),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  switchModeButton: {
    color: '#fff',
  },
  whiteText: {
    color: '#fff',
  },
  inputRoot: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#444444',
      },
      '&:hover fieldset': {
        borderColor: '#444444',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#444444',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#444444',
    },
    '& .MuiOutlinedInput-input': {
      color: 'white',
    },
  },
}));
