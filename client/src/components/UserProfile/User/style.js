import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        backgroundColor: '#000',
        color: '#ffffff',
        minHeight: 'auto',
        borderRadius: theme.shape.borderRadius,
        border: '1px solid #444444',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
    },
    backButton: {
        color: '#888',
    },
    coverImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    },
    avatar: {
        width: '100px',
        height: '100px',
        position: 'absolute',
        bottom: '0',
        left: '16px',
        border: '3px solid #000',
        backgroundColor: 'lightgray',
        zIndex: 1,
    },
    userDetails: {
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
    },
    userHandle: {
        color: '#888',
        lineHeight: '10px',
    },
    textGrey: {
        color: '#888',
    },
    date: {
        paddingLeft: '5px',
        color: '#888',
    },
    tabsContainer: {
        marginTop: theme.spacing(1),
        color: '#444444',
        borderRadius: theme.shape.borderRadius,
    },
    tab: {
        color: '#888',
        flexGrow: 1,
    }
}));