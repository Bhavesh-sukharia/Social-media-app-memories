import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, Link } from '@material-ui/core';
import UserAvatar from '../../../UserProfile/UserAvatar';
import Moment from 'react-moment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import useStyles from './style';
import ActionMenu from './ActionMenu';
import { likePost, savePost } from '../../../../actions/Posts';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';

const Post = ({ post, currentUser }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(post.likeCount || 0);
  const [comments, setComments] = useState(post.comments || 0);
  const [liked, setLiked] = useState(post.liked);
  const [bookmarked, setBookmarked] = useState(post.saved);
  const [anchorEl, setAnchorEl] = useState(null);
  const disableActions = !currentUser;

  const openPost = () => {
    if (!anchorEl) {
      history.push(`/post/${post._id}`);
    }
  };

  const tags = post.tags[0].split(',');

  const combinedLength = post.message.length + tags.join(',').length;

  const handleMoreClick = () => {
    openPost();
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (!disableActions) {
      setLiked(!liked);
      setLikes(liked ? likes - 1 : likes + 1);
      dispatch(likePost(post._id));
    }
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    if (!disableActions) {
      setBookmarked(!bookmarked);
      dispatch(savePost(post._id));
    }
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    openPost();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserClick = (event) => {
    event.stopPropagation();
    let path = `/user/${post.creator.username}`;

    if(location.pathname !== path) {
      history.push(path);
    }
  };

  const handleEditPost = () => {
    history.push({
      pathname: `/post/${post._id}`,
      state: { editMode: true }
    });
  };

  return (
    <Card className={classes.card} onClick={openPost}>
      <div className={classes.mediaContainer}>
        <CardMedia
          className={classes.media}
          component="img"
          image={post.selectedFile}
          title={post.title}
        />
        <CardHeader
          avatar={
            <IconButton
              onClick={handleUserClick}
              className={classes.userLink}
              disableRipple
              disableTouchRipple
            >
              <UserAvatar height={50} width={50} username={post.creator.username} />
            </IconButton>
          }
          title={
            <Link
              component="button"
              onClick={handleUserClick}
              className={classes.userLink}
            >
              <span style={{ color: 'white' }}>{post.creator.name} </span>
              <span style={{ color: 'grey' }}>@{post.creator.username}</span>
            </Link>
          }
          subheader={<Moment fromNow style={{ color: 'grey' }}>{post.createdAt}</Moment>}
          action={
            <ActionMenu
              currentUser={currentUser}
              post={post}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              handleMenuClose={handleMenuClose}
              handleEditPost={handleEditPost}
            />
          }
          className={classes.header}
        />
      </div>
      <CardActionArea spacing={0.5}>
        <CardContent>
          <Typography variant="body2" style={{ color: 'white' }}>
            {post.message.slice(0, 100)}
            {combinedLength > 100 && (
              <span onClick={handleMoreClick} style={{ color: '#3f51b5', cursor: 'pointer' }}>...more</span>
            )}
          </Typography>
          <Typography variant="body2" style={{ color: 'white' }}>
            {tags.slice(0, 3).map((tag, index) => (
              <React.Fragment key={index}>
                {`#${tag.trim()} `}
              </React.Fragment>
            ))}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <div className={classes.leftActions}>
          <IconButton
            aria-label="add to favorites"
            onClick={handleLikeClick}
            className={liked ? classes.liked : classes.redButton}
          >
            <span disabled={disableActions}>
              {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </span>
            <Typography
              variant="body2"
              className={classes.number}
              style={{ color: liked ? '#ff69b4' : '#444444' }}
            >
              {likes}
            </Typography>
          </IconButton>
          <IconButton
            aria-label="comment"
            onClick={handleCommentClick}
            className={classes.blueButton}
          >
            <span>
              <CommentIcon />
            </span>
            <Typography
              variant="body2"
              className={classes.number}
              style={{ color: '#444444' }}
            >
              {comments}
            </Typography>
          </IconButton>
        </div>
        <div className={classes.rightActions}>
          <IconButton
            aria-label="bookmark"
            onClick={handleBookmarkClick}
            className={bookmarked ? classes.bookmarked : classes.blueButton}
          >
            <span disabled={disableActions}>
              {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </span>
          </IconButton>
          <IconButton
            aria-label="share"
            onClick={(e) => e.stopPropagation()}
            className={classes.blueButton}
          >
            <span>
              <ShareIcon />
            </span>
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
};

export default Post;
