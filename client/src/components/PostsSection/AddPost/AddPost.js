import React, { useState, useEffect } from 'react';
import { Box, IconButton, TextField, Button, Grid, Divider, Chip } from '@material-ui/core';
import { Autocomplete } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import MovieIcon from '@mui/icons-material/Movie';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import useStyles from './styles';
import UserAvatar from '../../UserProfile/UserAvatar';
import { createPosts } from '../../../actions/Posts';

const AddPost = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [postData, setPostData] = useState({ message: '', tags: '', selectedFile: '' });
    const [showHashtagInput, setShowHashtagInput] = useState(false);
    const [hashtags, setHashtags] = useState([]);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, []);

    const handleContainerClick = () => {
        if (!user) {
            history.push('/auth');
        }
    };

    const handleTextFieldClick = () => {
        setShowHashtagInput(true);
    };

    const handleHashtagChange = (event, newValue) => {
        setHashtags(newValue);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPostData({ ...postData, selectedFile: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPostData({ ...postData, selectedFile: '' });
    };

    const handlePostClick = (e) => {
        e.preventDefault();

        const tags = hashtags.join(',');

        dispatch(createPosts({ ...postData, tags: tags, name: user?.result?.name }, history));

        setPostData({ message: '', tags: '', selectedFile: '' });
        setHashtags([]);
        setShowHashtagInput(false);
    };

    return (
        <Grid item className={classes.formContainer} onClick={handleContainerClick}>
            <Box className={classes.upperPart}>
                <Box className={classes.headerLeft}>
                    <UserAvatar width={50} height={50} username={user?.username} />
                </Box>
                <Box className={classes.headerRight}>
                    <TextField
                        name='message'
                        variant='standard'
                        fullWidth
                        multiline
                        maxRows={10}
                        placeholder="Write your memory here..."
                        InputProps={{
                            disableUnderline: true,
                            className: classes.inputText,
                        }}
                        onClick={handleTextFieldClick}
                        onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                        value={postData.message}
                    />
                    {showHashtagInput && (
                        <Autocomplete
                            multiple
                            freeSolo
                            options={[]}
                            value={hashtags}
                            onChange={handleHashtagChange}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} className={classes.chip} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    placeholder="Add hashtags"
                                    className={classes.inputText}
                                />
                            )}
                            className={classes.hashtagInput}
                        />
                    )}
                    {postData.selectedFile && (
                        <Box className={classes.imageContainer}>
                            <img src={postData.selectedFile} alt="Selected" className={classes.previewImage} />
                            <IconButton className={classes.removeImageButton} onClick={handleRemoveImage}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    )}
                </Box>
            </Box>
            <Box className={classes.lowerPart}>
                <Divider className={classes.divider} />
                <Grid container spacing={1} className={classes.lowerGrid}>
                    <Grid item xs={2}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="icon-button-file"
                            type="file"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="icon-button-file">
                            <IconButton className={classes.mediaButton} component="span">
                                <ImageIcon />
                                <span className={classes.iconLabel}>Image</span>
                            </IconButton>
                        </label>
                    </Grid>
                    <Grid item xs={2} >
                        <IconButton className={classes.mediaButton}>
                            <MovieIcon />
                            <span className={classes.iconLabel}>Video</span>
                        </IconButton>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton className={classes.mediaButton}>
                            <AttachFileIcon />
                            <span className={classes.iconLabel}>Attach</span>
                        </IconButton>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton className={classes.mediaButton}>
                            <AudioFileIcon />
                            <span className={classes.iconLabel}>Audio</span>
                        </IconButton>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant='contained' color='primary' className={classes.postButton} onClick={handlePostClick}>
                            Post
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
};

export default AddPost;
