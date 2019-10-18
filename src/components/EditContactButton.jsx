//react
import React from 'react';

//redux
import { useDispatch } from 'react-redux';
import { openEditContactModal } from '../redux/modules/contacts';

//mui
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

//icons
import EditIcon from '@material-ui/icons/Edit';

//styles
const useStyles = makeStyles(theme => ({}));

export default function({ btnClassName }) {
    //redux
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(openEditContactModal());
    };

    //mui
    const classes = useStyles();

    return (
        <IconButton
            className={btnClassName}
            fullWidth
            variant='contained'
            color='primary'
            onClick={handleOpen}>
            <EditIcon fontSize='small' />
        </IconButton>
    );
}
