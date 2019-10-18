//react
import React, { useState, useEffect, Fragment } from 'react';

//components
import Contact from '../components/Contact';
import CreateContactDialog from '../components/CreateContactDialog';
import EditContactDialog from '../components/EditContactDialog';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from '../redux/modules/contacts';

//mui
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

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
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                {!isLoading && (
                    <TableBody>
                        {contacts.map(contact => {
                            return <Contact key={contact.contactId} contact={contact} />;
                        })}
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Job title &amp; company</TableCell>
                        </TableRow>
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
            <CreateContactDialog />
            <EditContactDialog />
        </Fragment>
    );
}
