//react
import React, { useState } from 'react';

//redux
import { useDispatch } from 'react-redux';
import { openEditContactModal } from '../redux/modules/contacts';

//components
import EditContactButton from './EditContactButton';

//mui
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

//icon
import EditIcon from '@material-ui/icons/Edit';

//styles
const useStyles = makeStyles(theme => ({
    name: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        marginRight: theme.spacing(2),
    },
    hidden: {
        visibility: 'hidden',
    },
}));

export default function Contact({ contact }) {
    //redux
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(openEditContactModal(contact.contactId));
    };

    //react
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = e => {
        setHovered(true);
    };

    const handleMouseLeave = e => {
        setHovered(false);
    };

    //mui
    const classes = useStyles();

    const avatarLetters = contact.firstName.charAt(0) + contact.lastName.charAt(0);

    return (
        <TableRow
            key={contact.contactId}
            hover
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <TableCell>
                <section className={classes.name}>
                    <Avatar className={classes.avatar}>{avatarLetters}</Avatar>
                    {contact.firstName} {contact.lastName}
                </section>
            </TableCell>
            <TableCell>{contact.email}</TableCell>
            <TableCell>{contact.phone}</TableCell>
            <TableCell>
                {contact.jobTitle && contact.company
                    ? `${contact.jobTitle}, ${contact.company}`
                    : contact.jobTitle
                    ? contact.JobTitle
                    : contact.company}
            </TableCell>
            <TableCell>
                <IconButton className={!hovered ? classes.hidden : ''} onClick={handleOpen}>
                    <EditIcon fontSize='small' />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
