import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        backgroundColor: '#000',
        color: '#ffffff',
        minHeight: 'auto',
        borderRadius: theme.shape.borderRadius,
        border: '1px solid #444444',
      },
      messageBox: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '32px',
        minHeight: '300px',
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
      },
      message: {
        fontSize: '1.2rem',
        color: '#444444'
      },
}));
