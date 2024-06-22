import React from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useStyles from './style.js';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../../actions/Posts.js';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';

const ActionMenu = ({ currentUser, post, anchorEl, setAnchorEl, handleMenuClose, handleEditPost }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleMenuToggle = (event) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };


  const handleDeletePost = () => {
      handleMenuClose();
      dispatch(deletePost(post._id));

      if (history.length > 2) {
        history.goBack();
      } else {
        history.push('/');
      }
  };

  const menuItems = [
    currentUser && currentUser.username === post.creator.username && (
      <MenuItem
        key="edit"
        onClick={handleEditPost}
        className={classes.menuItem}
        style={{ color: 'grey' }}
      >
        <EditIcon style={{ color: 'grey', marginRight: '8px' }} /> Edit
      </MenuItem>
    ),
    currentUser && currentUser.username === post.creator.username && (
      <MenuItem
        key="delete"
        onClick={handleDeletePost}
        className={classes.menuItem}
        style={{ color: 'red' }}
      >
        <DeleteIcon style={{ color: 'red', marginRight: '8px' }} /> Delete
      </MenuItem>
    ),
    <MenuItem
      key="coming-soon"
      onClick={handleMenuClose}
      className={classes.menuItem}
      style={{ color: 'grey' }}
    >
      Coming Soon...
    </MenuItem>
  ].filter(Boolean);

  return (
    <>
      <IconButton aria-label="settings" onClick={handleMenuToggle} className={classes.menuButton}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        classes={{ paper: classes.menuPaper }}
        elevation={3}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClick={(e) => e.stopPropagation()} // Prevent click on menu items from propagating
      >
        {menuItems}
      </Menu>
    </>
  );
};

export default ActionMenu;
