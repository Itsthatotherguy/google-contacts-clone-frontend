import React, { useState, Fragment } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/modules/user';

//mui stuff
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

//util
import { stringToHslColour, getAvatarLetters } from '../utils/helpers';

//styles
const useStyles = makeStyles(theme => ({
    menuButton: {},
}));

export default function UserDropdown() {
    //redux
    const dispatch = useDispatch();
    const {
        credentials: { userName },
    } = useSelector(state => state.user);

    //react
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

    return (
        <Fragment>
            <IconButton size='small' onClick={handleClick} className={classes.menuButton}>
                {/* {isImageLoading ? (
                    <CircularProgress size={36} />
                ) : (
                    <Avatar src={imageUrl} alt='user' className={classes.image} />
                )} */}
                <Avatar style={{ backgroundColor: stringToHslColour(userName, 30, 50) }}>
                    {getAvatarLetters(userName)}
                </Avatar>
            </IconButton>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Fragment>
    );
}
