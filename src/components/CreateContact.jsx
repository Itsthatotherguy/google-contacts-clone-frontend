//react
import React, { Fragment, useState } from 'react';

//mui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//icons
import AddIcon from '@material-ui/icons/Add';

//styles
const useStyles = makeStyles(theme => ({
    textField: {
        margin: 0,
    },
    dialogFooter: {
        padding: theme.spacing(2, 3),
    },
}));

export default function CreateContact() {
    //react
    const [open, setOpen] = useState(false);
    const [saved, setSaved] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [company, setCompany] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        if (!saved) {
            setOpenConfirmationDialog(true);
        } else {
            setOpen(false);
        }
    };

    const handleCloseConfirmationDialog = () => {
        setOpenConfirmationDialog(false);
    };

    const handleDiscardChanges = () => {
        setOpenConfirmationDialog(false);
        setOpen(false);
    };

    const handleChangeFirstName = e => {
        setFirstName(e.target.value);
    };

    const handleChangeLastName = e => {
        setLastName(e.target.value);
    };

    const handleChangeCompany = e => {
        setCompany(e.target.value);
    };

    const handleChangeJobTitle = e => {
        setJobTitle(e.target.value);
    };

    const handleChangeEmail = e => {
        setEmail(e.target.value);
    };

    const handleChangePhone = e => {
        setPhone(e.target.value);
    };

    const handleChangeNotes = e => {
        setNotes(e.target.value);
    };

    //mui
    const classes = useStyles();

    return (
        <Fragment>
            <Button variant='contained' color='primary' onClick={handleOpen}>
                <AddIcon />
                <Typography variant='body'>Create contact</Typography>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'
                maxWidth='sm'
                fullWidth>
                <DialogTitle>Create new contact</DialogTitle>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item xs={6} className={classes.gridItem}>
                            <TextField
                                margin='dense'
                                variant='outlined'
                                label='First name'
                                type='text'
                                value={firstName}
                                onChange={handleChangeFirstName}
                                fullWidth
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin='dense'
                                variant='outlined'
                                label='Last name'
                                type='text'
                                value={lastName}
                                onChange={handleChangeLastName}
                                fullWidth
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin='dense'
                                variant='outlined'
                                label='Company'
                                type='text'
                                value={company}
                                onChange={handleChangeCompany}
                                fullWidth
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin='dense'
                                variant='outlined'
                                label='Job title'
                                type='text'
                                value={jobTitle}
                                onChange={handleChangeJobTitle}
                                fullWidth
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin='dense'
                                variant='outlined'
                                label='Email'
                                type='email'
                                value={email}
                                onChange={handleChangeEmail}
                                fullWidth
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin='dense'
                                variant='outlined'
                                label='Phone'
                                type='tel'
                                value={phone}
                                onChange={handleChangePhone}
                                fullWidth
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin='dense'
                                variant='outlined'
                                label='Notes'
                                type='text'
                                value={notes}
                                onChange={handleChangeNotes}
                                fullWidth
                                multiline
                                rows='3'
                                className={classes.textField}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className={classes.dialogFooter}>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button variant='contained' color='primary'>
                        Save
                    </Button>
                </DialogActions>
                <Dialog
                    open={openConfirmationDialog}
                    onClose={handleCloseConfirmationDialog}
                    aria-labelledby='form-dialog-title'
                    maxWidth='xs'
                    fullWidth>
                    <DialogTitle>You have unsaved changes</DialogTitle>
                    <DialogContent>
                        <Typography variant='body1'>Are you sure you want to close?</Typography>
                    </DialogContent>
                    <DialogActions className={classes.dialogFooter}>
                        <Button onClick={handleDiscardChanges} color='primary'>
                            Discard
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleCloseConfirmationDialog}>
                            Keep editing
                        </Button>
                    </DialogActions>
                </Dialog>
            </Dialog>
        </Fragment>
    );
}
