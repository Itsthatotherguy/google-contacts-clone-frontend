//react
import React from 'react';

//redux
import { useDispatch } from 'react-redux';
import { openEditContactModal } from '../redux/modules/contacts';

//mui
import IconButton from '@material-ui/core/IconButton';

//icons
import EditIcon from '@material-ui/icons/Edit';

export default function({ btnClassName }) {
    //redux
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(openEditContactModal());
    };

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
