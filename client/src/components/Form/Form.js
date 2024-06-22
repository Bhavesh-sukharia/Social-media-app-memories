import React, { useEffect, useState } from 'react';
import { TextField, Typography, Button, Paper, IconButton, Divider, Box } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import CameraEnhanceOutlinedIcon from '@mui/icons-material/CameraEnhanceOutlined';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { createPosts, updatePost } from '../../actions/Posts';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import useStyles from './style';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const [isOpen, setIsOpen] = useState(false);
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else {
            dispatch(createPosts({ ...postData, name: user?.result?.name }, history));
        }

        clear();
    };

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    };

    const handleToggleForm = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Box className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Box className={classes.formHeader} onClick={handleToggleForm}>
                    <Box className={classes.headerLeft}>
                        <CameraEnhanceOutlinedIcon className={classes.headerIcon} />
                        <Typography variant='h6' className={classes.headerTitle}>Create a Memory</Typography>
                    </Box>
                    <IconButton>
                        {isOpen ? <CloseIcon /> : <AddIcon />}
                    </IconButton>
                </Box>
                {isOpen && (
                    <>
                        <Divider className={classes.divider} />
                        <TextField name="title" variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                        <TextField name="message" variant='outlined' label='Message' fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                        <TextField name="tags" variant='outlined' label="Tags (comma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                        <div className={classes.fileInput}>
                            <FileBase
                                type='file'
                                multiple={false}
                                onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                            />
                        </div>
                        <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                        <Button className={classes.buttonClear} variant='contained' color='secondary' size='large' onClick={clear} fullWidth>Clear</Button>
                    </>
                )}
            </form>
        </Box>
    );
};

export default Form;
