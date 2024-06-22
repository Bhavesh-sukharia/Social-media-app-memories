import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    sectionBox: {
        padding: theme.spacing(1),
        border: '1px solid #444444',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'black', // Dark background color
        color: '#fff', // White text color
        '& .MuiFormControlLabel-root': {
            marginLeft: "0px",
            color: '#ffffff',
        },
        '& .MuiRadio-root': {
            color: '#d6d6d6',
        },
    },
    boldText: {
        fontWeight: 'bold',
        color: '#fff', // Ensure the bold text is white
    },
    radioOption: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '-8px 0px',
        color: '#fff', // Ensure the text color is white
    },
    radioLabel: {
        flex: 1,
        color: '#fff', // Ensure the radio label is white
    },
    link: {
        textDecoration: 'none',
        color: 'inherit', // Inherit the text color
        '&:hover': {
            textDecoration: 'underline', // Add underline on hover
        },
    },
}));
