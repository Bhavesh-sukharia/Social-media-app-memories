import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { CircularProgress, IconButton, Grid, Box, Typography, Divider, TextField, Button } from '@mui/material';
import ChipInput from 'material-ui-chip-input';
import moment from 'moment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import { getPost, likePost, savePost, updatePost } from '../../actions/Posts';
import useStyles from './styles';
import UserAvatar from '../UserProfile/UserAvatar';
import ActionMenu from '../PostsSection/PostsBrowse/Post/ActionMenu';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const PostDetails = () => {
  const classes = useStyles();
  const { post, isLoading } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.auth.authData);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { postId } = useParams();
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [bookmarks, setBookmarks] = useState(0);
  const [isCommentFocused, setIsCommentFocused] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editMessage, setEditMessage] = useState('');
  const [editTags, setEditTags] = useState([]);
  const [isEditMode, setIsEditMode] = useState(location.state?.editMode || false);
  const disableActions = user ? false : true;

  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (post) {
      setEditMessage(post.message);
      setEditTags(post.tags);
      setLikes(post.likeCount);
      setLiked(post.liked);
      setBookmarks(post.saveCount);
      setBookmarked(post.saved);
    }
  }, [post]);

  const handleBackClick = () => {
    if (history.length > 2) {
      history.goBack();
    } else {
      history.push('/');
    }
  };

  const handleLikeClick = () => {
    if (!disableActions) {
      setLiked(!liked);
      setLikes(liked ? likes - 1 : likes + 1);
      dispatch(likePost(post._id));
    }
  };

  const handleCommentClick = () => {
    if (!user) {
      history.push('/auth');
    } else {
      setCommented(!commented);
    }
  };

  const handleBookmarkClick = () => {
    if (!disableActions) {
      setBookmarked(!bookmarked);
      setBookmarks(bookmarked ? bookmarks - 1 : bookmarks + 1);
      dispatch(savePost(post._id));
    }
  };

  const handleCommentFocus = () => {
    setIsCommentFocused(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    const updatedPost = { ...post, message: editMessage, tags: editTags };

    dispatch(updatePost(postId, updatedPost)).then(() => {
      dispatch(getPost(postId));
      setIsEditMode(false);
    });
  };

  const handleEditPost = () => {
    setIsEditMode(true);
    handleMenuClose();
  };

  const handleAddChip = (chip) => {
    setEditTags([...editTags, chip]);
  };

  const handleDeleteChip = (chip, index) => {
    setEditTags(editTags.filter((tag, i) => i !== index));
  };

  const handleContainerClick = () => {
    if (!user) {
      history.push('/auth');
    }
  }

  if (isLoading || !post) {
    return (
      <Grid item className={classes.root}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress color="primary" />
        </Box>
      </Grid>
    );
  }

  const tags = post.tags[0].split(',');

  return (
    <Grid item className={classes.root}>
      <Box className={classes.toolbar}>
        <IconButton onClick={handleBackClick} className={classes.backButton}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">Post</Typography>
      </Box>
      <Box display="flex" alignItems="center" m={1} ml={2} mr={2}>
        <UserAvatar width={50} height={50} username={post.creator.username} className={classes.avatar} />
        <Box ml={2} flexGrow={1}>
          <Typography variant="body1">{post.creator.name}</Typography>
          <Typography variant="body2" color="grey">@{post.creator.username}</Typography>
        </Box>
        {!isEditMode && (
          <ActionMenu
            currentUser={user}
            post={post}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            handleMenuClose={handleMenuClose}
            handleEditPost={handleEditPost}
          />
        )}
      </Box>
      <Box m={2} display="flex" flexWrap="wrap">
        {!isEditMode ? (
          <Typography variant="body1" className={classes.content}>
            {post.message}
          </Typography>
        ) : (
          <TextField
            variant="outlined"
            fullWidth
            multiline
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)}
            className={`${classes.content} ${classes.editField}`}
          />
        )}
      </Box>
      <Box m={2} display="flex" flexWrap="wrap">
        {!isEditMode ? (
          <Typography variant="body2" color="primary">
            {tags.map((tag) => `#${tag.trim()}`).join(' ')}
          </Typography>
        ) : (
          <ChipInput
            value={editTags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip, index) => handleDeleteChip(chip, index)}
            placeholder="Add a tag"
            fullWidth
            classes={{
              root: classes.chipInputRoot,
              inputRoot: classes.chipInput,
            }}
          />
        )}
      </Box>
      {isEditMode && (
        <Box m={2}>
          <Button variant="outlined" className={classes.updateButton} onClick={handleUpdate} fullWidth>
            Update
          </Button>
        </Box>
      )}
      <Box m={2} mb={1}>
        <img src={post.selectedFile} alt="Post" className={classes.image} />
      </Box>
      <Typography variant="body2" color="grey" m={2} mt={1}>
        {moment(post.createdAt).format('h:mm A · MMM D, YYYY')}
      </Typography>
      <Divider variant="middle" className={classes.divider} />
      <Box display="flex" justifyContent="space-around" p={1}>
        <IconButton
          aria-label="add to favorites"
          onClick={handleLikeClick}
          className={liked ? classes.liked : classes.redButton}
          style={{ color: liked ? '#E0245E' : '#444444'}}
        >
          <span disabled={disableActions}>
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </span>
          <Typography variant="body2" style={{ color: liked ? '#E0245E' : '#444444', marginLeft: '4px' }}>
            {likes}
          </Typography>
        </IconButton>
        <IconButton
          aria-label="comment"
          onClick={handleCommentClick}
          className={classes.blueButton}
          style={{color: '#444444'}}
        >
          <CommentIcon />
          <Typography variant="body2" style={{ color: commented ? '#1DA1F2' : '#444444', marginLeft: '4px' }}>
            {comments}
          </Typography>
        </IconButton>
        <IconButton
          aria-label="bookmark"
          onClick={handleBookmarkClick}
          className={bookmarked ? classes.bookmarked : classes.blueButton}
          style={{color: bookmarked ? '#1DA1F2' : '#444444'}}
        >
          <span disabled={disableActions}>
            {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </span>
          <Typography variant="body2" style={{ color: bookmarked ? '#1DA1F2' : '#444444', marginLeft: '4px' }}>
            {bookmarks}
          </Typography>
        </IconButton>
        <IconButton aria-label="share" className={classes.blueButton} style={{color: '#444444'}}>
          <ShareIcon />
        </IconButton>
      </Box>
      <Divider variant="middle" className={classes.divider} />
      <Box className={classes.commentSection} onClick={handleContainerClick}>
        <Box className={classes.userAvatarBox}>
          <UserAvatar width={50} height={50} username={user?.username} />
        </Box>
        <Box className={classes.commentFieldBox}>
          <TextField
            name="message"
            variant="standard"
            fullWidth
            multiline
            maxRows={10}
            placeholder="Write comment here..."
            onFocus={handleCommentFocus}
            InputProps={{
              disableUnderline: true,
              className: classes.inputText,
              classes: { input: classes.inputText },
            }}
          />
        </Box>
        {!isCommentFocused && (
          <Button variant="contained" color="primary" className={classes.replyButton}>
            Reply
          </Button>
        )}
      </Box>
      {isCommentFocused && (
        <Box display="flex" justifyContent="flex-end" m={2}>
          <Button variant="contained" color="primary" className={classes.replyButton}>
            Reply
          </Button>
        </Box>
      )}
    </Grid>
  );
};

export default PostDetails;
