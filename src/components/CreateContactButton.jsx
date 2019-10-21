//react
import React, { Fragment } from 'react';

//redux
import { useDispatch } from 'react-redux';
import { openCreateContactModal } from '../redux/modules/contacts';

//mui
import Button from '@material-ui/core/Button';

//icons
import AddIcon from '@material-ui/icons/Add';

export default function CreateContact({ className }) {
    //redux
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(openCreateContactModal());
    };

    return (
        <Button className={className} variant='contained' color='primary' onClick={handleOpen}>
            <AddIcon />
        </Button>
    );
}
