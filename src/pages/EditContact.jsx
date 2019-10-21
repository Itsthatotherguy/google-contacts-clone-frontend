import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

//components
import Avatar from '../components/Avatar';

//redux
import { useSelector } from 'react-redux';
import { contactSelector } from '../redux/modules/contacts';

//mui
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessIcon from '@material-ui/icons/Business';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import NotesIcon from '@material-ui/icons/Notes';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

//styles
const useStyles = makeStyles(theme => ({
	appBar: {
		backgroundColor: theme.palette.common.white,
	},
	paper: {
		flex: 1,
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(3),
	},
	avatar: {
		// transform: 'scale(2) translateY(25%)',
		height: '5rem',
		width: '5rem',
		fontSize: '2rem',
		margin: theme.spacing(3, 0),
	},
	divider: {
		margin: theme.spacing(5, 0),
	},
	pageTitle: {
		flex: 1,
		marginLeft: theme.spacing(3),
	},
}));

export default function EditContact(props) {
	const { id: contactId } = useParams();
	const history = useHistory();

	const contact = useSelector(contactSelector(contactId));
	console.log(contact);

	const [contactInfo, setContactInfo] = useState({});

	useEffect(() => {
		setContactInfo({
			firstName: contact ? contact.firstName : '',
			lastName: contact ? contact.lastName : '',
			jobTitle: contact ? contact.jobTitle : '',
			company: contact ? contact.company : '',
			email: contact ? contact.email : '',
			phone: contact ? contact.phone : '',
			notes: contact ? contact.notes : '',
		});
	}, []);

	const handleInputChange = e => {
		setContactInfo({
			...contactInfo,
			[e.target.name]: e.target.value,
		});
	};

	const classes = useStyles();
	console.log(props);

	return (
		<Paper className={classes.paper}>
			<AppBar position='fixed' className={classes.appBar}>
				<Toolbar>
					<IconButton onClick={() => history.goBack()}>
						<CloseIcon />
					</IconButton>
					<Typography
						className={classes.pageTitle}
						variant='h6'
						color='textPrimary'
					>
						Edit contact
					</Typography>
					<Button color='primary'>Save</Button>
				</Toolbar>
			</AppBar>
			<Grid container>
				<Grid item xs={12}>
					<Grid container direction='column' alignItems='center'>
						<Avatar
							className={classes.avatar}
							name={`${contactInfo.firstName} ${contactInfo.lastName}`}
						/>
					</Grid>
				</Grid>
				<Grid item xs={12} className={classes.divider}>
					<Divider />
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={3} alignItems='center'>
						<Grid item xs={2}>
							<Grid container justify='center'>
								<AccountCircleIcon />
							</Grid>
						</Grid>
						<Grid item xs={10}>
							<TextField
								name='firstName'
								fullWidth
								placeholder='First name'
								value={contactInfo.firstName}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={2} />
						<Grid item xs={10}>
							<TextField
								name='lastName'
								fullWidth
								placeholder='Last name'
								value={contactInfo.lastName}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={2}>
							<Grid container justify='center'>
								<BusinessIcon />
							</Grid>
						</Grid>
						<Grid item xs={10}>
							<TextField
								name='company'
								fullWidth
								placeholder='Company'
								value={contactInfo.company}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={2} />
						<Grid item xs={10}>
							<TextField
								name='jobTitle'
								fullWidth
								placeholder='Job title'
								value={contactInfo.jobTitle}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={2}>
							<Grid container justify='center'>
								<PhoneIcon />
							</Grid>
						</Grid>
						<Grid item xs={10}>
							<TextField
								name='phone'
								fullWidth
								placeholder='Phone'
								value={contactInfo.phone}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={2}>
							<Grid container justify='center'>
								<EmailIcon />
							</Grid>
						</Grid>
						<Grid item xs={10}>
							<TextField
								name='email'
								fullWidth
								placeholder='Email'
								value={contactInfo.email}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={2}>
							<Grid container justify='center'>
								<NotesIcon />
							</Grid>
						</Grid>
						<Grid item xs={10}>
							<TextField
								name='notes'
								fullWidth
								placeholder='Notes'
								value={contactInfo.notes}
								onChange={handleInputChange}
								multiline
								rows={3}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}
