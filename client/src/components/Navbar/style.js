import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    navbar: {
        margin: '0px 0px 16px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 10px 0px',
        backgroundColor: "#000000",
    },
    logoSection: {
        display: 'flex',
        alignItems: 'center',
    },
    searchBox: {
        flex: 1,
        marginX: 2,
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
            width: '100%',
            margin: '10px 0',
        },
    },
    searchBoxSmall: {
        position: 'absolute',
        top: '60px',
        left: 0,
        right: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
    },
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#555555',
        borderRadius: '25px',
        width: '100%',
        maxWidth: '300px',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    searchPaperSmall: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#555555',
        borderRadius: '25px',
        width: '90%',
    },
    inputBase: {
        marginLeft: 1,
        flex: 1,
        paddingLeft: '20px',
        color: '#ffffff',
    },
    iconButton: {
        padding: '10px',
        color: '#ffffff',
    },
    image: {
        padding: '5px 12px 0px 10px',
        height: '40px'
    },
    toolbarSection: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'flex-end',
            width: '100%',
        },
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '300px',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            width: 'auto',
            marginTop: 20,
            justifyContent: 'center',
        },
    },
    toolbarIcon: {
        padding: theme.spacing(1),
        color: '#ffffff',
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
    },
    searchIcon: {
        display: 'flex',
        alignItems: 'center',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
    },
}));
