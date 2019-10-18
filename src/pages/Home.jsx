//react
import React, { useEffect, Fragment } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from '../redux/modules/contacts';

//mui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

//styles
const useStyles = makeStyles(theme => ({
    wrapper: {
        width: '100%',
        textAlign: 'center',
        marginTop: theme.spacing(3),
    },
}));

export default function Home() {
    //redux
    const dispatch = useDispatch();
    const {
        contacts: { contacts, isLoading },
    } = useSelector(state => state);

    //react
    useEffect(() => {
        dispatch(fetchContacts());
    }, []);

    //mui
    const classes = useStyles();
    return (
        <Fragment>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone number</TableCell>
                        <TableCell>Job title &amp; company</TableCell>
                    </TableRow>
                </TableHead>
                {!isLoading && (
                    <TableBody>
                        {contacts.map(contact => {
                            return (
                                <TableRow key={contact.contactId}>
                                    <TableCell>
                                        {contact.firstName} {contact.lastName}
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
                                </TableRow>
                            );
                        })}
                    </TableBody>
                )}
            </Table>
            {isLoading && (
                <div className={classes.wrapper}>
                    <CircularProgress />
                </div>
            )}
            {!isLoading && contacts.length === 0 && (
                <div className={classes.wrapper}>
                    <Typography variant='h6'>You currently have no contacts saved.</Typography>
                </div>
            )}
        </Fragment>
    );
}
