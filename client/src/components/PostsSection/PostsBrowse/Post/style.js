import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    card: {
        borderRadius: '4px',
        border: '1px solid #444444',
        position: 'relative',
        backgroundColor: '#000', // Black background
        color: '#fff', // White text color
    },
    mediaContainer: {
        position: 'relative',
    },
    media: {
        width: '100%',
        height: '300px',
    }, 
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '95%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background
        color: '#fff', // White text color
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 16px',
    },
    menuButton: {
        color: '#444444',
        cursor: 'pointer',
    },
    iconButton: {
        color: '#444444', // Set the color of the vertical dots to grey
    },
    menuPaper: {
        backgroundColor: '#000', // Black background
        color: '#ffffff', // White text color
        border: '1px solid #444444',
        boxShadow: '0px 5px 15px rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
    },
    menuItem: {
        color: '#fff', // White text color
    },
    userLink: {
        textDecoration: 'none', // Optional: to remove underline
        padding: 0
    },
    leftActions: {
        display: 'flex',
        alignItems: 'center',
    },
    rightActions: {
        display: 'flex',
        alignItems: 'center',
    },
    redButton: {
        color: '#444444', // Set the color of the icons to grey
        transition: 'color 0.3s, filter 0.3s',
        '&:hover': {
            filter: 'brightness(1.5) drop-shadow(0 0 10px #E0245E)', // Glow effect on hover
        },
    },
    blueButton: {
        color: '#444444', // Set the color of the icons to grey
        transition: 'color 0.3s, filter 0.3s',
        '&:hover': {
            filter: 'brightness(1.5) drop-shadow(0 0 10px #1DA1F2)', // Glow effect on hover
        },
    },
    liked: {
        color: '#E0245E', // Twitter-like red color for liked icon
        '&:hover': {
            filter: 'brightness(1.5) drop-shadow(0 0 6px #E0245E)', // Red glow on hover
        },
    },
    bookmarked: {
        color: '#1DA1F2', // Blue color for bookmarked icon
        '&:hover': {
            filter: 'brightness(1.5) drop-shadow(0 0 6px #1DA1F2)', // Blue glow on hover
        },
    },
    number: {
        marginLeft: '4px',
        fontSize: '12px',
        transition: 'color 0.3s',
    },
});
