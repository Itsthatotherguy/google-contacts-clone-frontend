//react
import React, { Fragment, useState, useEffect } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { createContact, clearErrors } from '../redux/modules/contacts';

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
import CircularProgress from '@material-ui/core/CircularProgress';

//icons
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessIcon from '@material-ui/icons/Business';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import NotesIcon from '@material-ui/icons/Notes';

//styles
const useStyles = makeStyles(theme => ({
	textField: {
		margin: theme.spacing(0, 0, 0, 1),
	},
	dialogFooter: {
		padding: theme.spacing(2, 3),
	},
	wrapper: {
		position: 'relative',
	},
	progressIndicator: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
	gridRow: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		'&:not(:last-of-type)': {
			marginBottom: theme.spacing(1),
		},
	},
}));

export default function CreateContact() {
	//redux
	const dispatch = useDispatch();
	const {
		contacts: { isLoading, errors },
	} = useSelector(state => state);

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

	useEffect(() => {
		if (!errors && !isLoading) {
			handleClearForm();
			setOpen(false);
		}
	}, [isLoading, errors]);

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
		handleClearForm();
	};

	const handleClearForm = () => {
		setFirstName('');
		setLastName('');
		setCompany('');
		setJobTitle('');
		setEmail('');
		setPhone('');
		setNotes('');
		dispatch(clearErrors());
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

	const handleSubmit = e => {
		e.preventDefault();

		const newContact = {
			firstName,
			lastName,
			company,
			jobTitle,
			email,
			phone,
			notes,
		};

		dispatch(createContact(newContact));
	};

	//mui
	const classes = useStyles();

	return (
		<Fragment>
			<Button
				fullWidth
				variant='contained'
				color='primary'
				onClick={handleOpen}
			>
				<AddIcon />
				<Typography variant='body'>Create contact</Typography>
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'
				maxWidth='sm'
				fullWidth
			>
				<DialogTitle>Create new contact</DialogTitle>
				<DialogContent>
					<section className={classes.gridRow}>
						<AccountCircleIcon />
						<TextField
							margin='dense'
							variant='outlined'
							label='First name'
							type='text'
							value={firstName}
							error={!!errors.firstName}
							helperText={
								errors.firstName ? errors.firstName : ''
							}
							onChange={handleChangeFirstName}
							fullWidth
							className={classes.textField}
						/>
						<TextField
							margin='dense'
							variant='outlined'
							label='Last name'
							type='text'
							value={lastName}
							onChange={handleChangeLastName}
							error={!!errors.lastName}
							helperText={errors.lastName ? errors.lastName : ''}
							fullWidth
							className={classes.textField}
						/>
					</section>
					<section className={classes.gridRow}>
						<BusinessIcon />
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
					</section>
					<section className={classes.gridRow}>
						<EmailIcon />
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
					</section>
					<section className={classes.gridRow}>
						<PhoneIcon />
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
					</section>
					<section className={classes.gridRow}>
						<NotesIcon />
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
					</section>
				</DialogContent>
				<DialogActions className={classes.dialogFooter}>
					{!isLoading && (
						<Button onClick={handleClose} color='primary'>
							Cancel
						</Button>
					)}
					<div className={classes.wrapper}>
						<Button
							variant='contained'
							color='primary'
							className={classes.button}
							onClick={handleSubmit}
							disabled={isLoading}
						>
							Save
						</Button>
						{isLoading && (
							<CircularProgress
								size={24}
								className={classes.progressIndicator}
							/>
						)}
					</div>
				</DialogActions>
				<Dialog
					open={openConfirmationDialog}
					onClose={handleCloseConfirmationDialog}
					aria-labelledby='form-dialog-title'
					maxWidth='xs'
					fullWidth
				>
					<DialogTitle>You have unsaved changes</DialogTitle>
					<DialogContent>
						<Typography variant='body1'>
							Are you sure you want to close?
						</Typography>
					</DialogContent>
					<DialogActions className={classes.dialogFooter}>
						<Button onClick={handleDiscardChanges} color='primary'>
							Discard
						</Button>
						<Button
							variant='contained'
							color='primary'
							onClick={handleCloseConfirmationDialog}
						>
							Keep editing
						</Button>
					</DialogActions>
				</Dialog>
			</Dialog>
		</Fragment>
	);
}
