import React, { useState, Fragment } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/modules/user';

//mui stuff
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';

//styles
const useStyles = makeStyles(theme => ({
    menuButton: {},
}));

export default function UserDropdown() {
    //redux
    const dispatch = useDispatch();
    const {
        credentials: { imageUrl },
    } = useSelector(state => state.user);

    //react
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = e => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    //mui
    const classes = useStyles();

    const image = new Image();
    if (imageUrl) image.src = imageUrl;
    image.onload = () => {
        setIsImageLoading(false);
    };

    return (
        <Fragment>
            <Button onClick={handleClick} className={classes.menuButton}>
                {isImageLoading ? (
                    <CircularProgress size={36} />
                ) : (
                    <Avatar src={imageUrl} alt='user' className={classes.image} />
                )}
            </Button>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Fragment>
    );
}
