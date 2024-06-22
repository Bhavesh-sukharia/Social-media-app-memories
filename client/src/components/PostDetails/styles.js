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
    '&.MuiIconButton-root': {
      color: '#888',
      padding: '12px',
    },
  },
  postDetails: {
    padding: theme.spacing(2),
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #444444',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  content: {
    margin: theme.spacing(2),
  },
  editField: {
    '& .MuiOutlinedInput-root': {
      color: '#ffffff',
      borderColor: '#444444',
      '& fieldset': {
        borderColor: '#444444',
      },
      '&:hover fieldset': {
        border: '1px solid #444444',
      },
    },
    '& .MuiInputBase-input': {
      fontSize: '0.875rem', // Smaller font size
    },
  },
  image: {
    width: '100%',
    borderRadius: '8px',
  },
  iconButton: {
    color: '#444444', // Set the color of the icons to grey
    transition: 'color 0.3s, filter 0.3s',
    '&:hover': {
        filter: 'brightness(1.5) drop-shadow(0 0 10px #E0245E)', // Glow effect on hover
    },
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
    color: '#E0245E',
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
  commentField: {
    display: 'flex',
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  divider: {
    backgroundColor: '#444444',
  },
  commentSection: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2),
  },
  userAvatarBox: {
    marginRight: theme.spacing(2),
  },
  commentFieldBox: {
    flex: '4',
    display: 'flex',
    padding: '6px 0px 8px',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  inputText: {
    '&.MuiInput-input': {
      color: '#ffffff',
    },
  },
  replyButton: {
    marginLeft: theme.spacing(2),
    height: 'fit-content',
  },
  tag: {
    margin: theme.spacing(0.5),
  },
  chipInput: {
    '& .MuiChipInput-root': {
      color: '#ffffff',
      '& .MuiChip-root': {
        backgroundColor: '#555555',
        color: '#ffffff',
        margin: theme.spacing(1), // Ensures new chips have correct margin
      },
      '& .MuiInput-underline:before': {
        borderBottom: '1px solid #444444',
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottom: '1px solid #444444',
      },
      '& .MuiInput-underline:after': {
        borderBottom: '1px solid #444444',
      },
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
    },
  },
  chipInputRoot: {
    border: '1px solid #444444', // Full border for the ChipInput
  },
  updateButton: {
    border: '1px solid #888888', // Gray border for the update button
  },
}));
