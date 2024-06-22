import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    paper: {
        padding: theme.spacing(1),
        marginBottom: '1rem',
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    formHeader: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    headerIcon: {
        padding: '8px',
        backgroundColor: theme.palette.primary.main,
        borderRadius: '50%',
        color: '#fff',
    },
    headerTitle: {
        fontWeight: 'bold',
        paddingLeft: theme.spacing(1),
    },
    divider: {
        margin: '5px 0',
        width: '100%',
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
    buttonSubmit: {
        marginBottom: 10,
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    buttonClear: {
        backgroundColor: theme.palette.secondary.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
}));
