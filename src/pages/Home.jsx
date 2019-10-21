//react
import React, { Fragment } from 'react';

//redux
import { useDispatch } from 'react-redux';
import { openCreateContactModal } from '../redux/modules/contacts';

//components
import ListContacts from '../components/ListContacts';

//mui
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';

//icons
import AddIcon from '@material-ui/icons/Add';

//styles
const useStyles = makeStyles(theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

export default function Home() {
    //redux
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(openCreateContactModal());
    };

    //mui
    const classes = useStyles();

    return (
        <Fragment>
            <ListContacts />
            <Hidden mdUp>
                <Fab color='primary' className={classes.fab} onClick={handleOpen}>
                    <AddIcon />
                </Fab>
            </Hidden>
        </Fragment>
    );
}
