import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        padding: theme.spacing(2),
        border: "1px solid #444444",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'black',
        color: '#ffffff',
    },
    upperPart: {
        display: 'flex',
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    headerLeft: {
        display: 'flex',
        flex: '1',
        maxWidth: '12%',
    },
    headerRight: {
        flex: '4',
        display: 'flex',
        padding: '6px 0px 8px',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    lowerPart: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    lowerGrid: {
        justifyContent: 'space-between',
    },
    mediaButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        color: '#444444',
    },
    iconLabel: {
        color: '#444444',
        fontSize: '0.75rem',
    },
    postButton: {
        width: '100%',
        padding: theme.spacing(0.5),
        margin: theme.spacing(1),
    },
    divider: {
        marginBottom: '10px',
        backgroundColor: '#555555',
    },
    hashtagInput: {
        marginTop: theme.spacing(1),
        '& .MuiInputBase-root': {
            color: '#ffffff',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffffff',
        },
        '& .MuiInputLabel-root': {
            color: '#ffffff',
        },
        '& .MuiAutocomplete-tag': {
            backgroundColor: '#444444',
            color: '#ffffff',
        },
    },
    chip: {
        backgroundColor: '#444444',
        color: '#ffffff',
        margin: '2px'
    },
    input: {
        display: 'none',
    },
    imageContainer: {
        position: 'relative',
        width: '450px',
        marginTop: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1),
        backgroundColor: '#1010108c',
    },
    previewImage: {
        maxWidth: '400px',
        maxHeight: '400px',
        borderRadius: theme.shape.borderRadius,
    },
    removeImageButton: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#ffffff',
    },
    inputText: {
        color: '#ffffff',
    }
}));
