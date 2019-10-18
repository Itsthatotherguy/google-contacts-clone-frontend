//react
import React from 'react';

//redux
import { useDispatch } from 'react-redux';
import { openCreateContactModal } from '../redux/modules/contacts';

//mui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//icons
import AddIcon from '@material-ui/icons/Add';

//styles
const useStyles = makeStyles(theme => ({}));

export default function CreateContact() {
    //redux
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(openCreateContactModal());
    };

    return (
        <Button fullWidth variant='contained' color='primary' onClick={handleOpen}>
            <AddIcon />
            <Typography variant='button'>Create contact</Typography>
        </Button>
    );
}
