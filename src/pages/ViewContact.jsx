//react
import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

//components
import Avatar from '../components/Avatar';

//mui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

//styles
const useStyles = makeStyles(theme => ({
    paper: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
    },
    box: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        // transform: 'scale(2) translateY(25%)',
        height: '5rem',
        width: '5rem',
        fontSize: '2rem',
        margin: theme.spacing(3, 0),
    },
}));

export default function() {
    const { id: contactId } = useParams();

    const contactSelector = createSelector(
        state => state.contacts.contacts,
        contacts => contacts.find(contact => contact.contactId === contactId)
    );
    const contact = useSelector(contactSelector);
    console.log(contact);

    const contactInfo = {
        name: contact ? `${contact.firstName} ${contact.lastName}` : '',
    };

    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Box className={classes.box}>
                <Avatar className={classes.avatar} name={contactInfo.name} />
                <Typography variant='h6'>{contactInfo.name}</Typography>
                <Divider />
            </Box>
        </Paper>
    );
}
