//react
import React, { Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { contactSelector } from '../redux/modules/contacts';
import { createSelector } from 'reselect';

//components
import Avatar from '../components/Avatar';

//mui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';

//icons
import BusinessIcon from '@material-ui/icons/Business';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import NotesIcon from '@material-ui/icons/Notes';
import EditIcon from '@material-ui/icons/Edit';

//styles
const useStyles = makeStyles(theme => ({
	paper: {
		flex: 1,
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(3),
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
	divider: {
		margin: theme.spacing(5, 0),
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing(3),
		right: theme.spacing(2),
	},
	fabIcon: {
		marginRight: theme.spacing(1),
	},
}));

export default function() {
	const { id: contactId } = useParams();

	const contact = useSelector(contactSelector(contactId));
	console.log(contact);

	const contactInfo = {
		name: contact ? `${contact.firstName} ${contact.lastName}` : '',
		jobTitleAndCompany: contact
			? contact.jobTitle && contact.company
				? `${contact.jobTitle}, ${contact.company}`
				: contact.jobTitle
				? contact.JobTitle
				: contact.company
			: '',
		email: contact ? contact.email : '',
		phone: contact ? contact.phone : '',
		notes: contact ? contact.notes : '',
	};

	const classes = useStyles();

	return (
		<Paper className={classes.paper}>
			<Grid container>
				<Grid item xs={12}>
					<Grid container direction='column' alignItems='center'>
						<Avatar
							className={classes.avatar}
							name={contactInfo.name}
						/>
						<Typography variant='h6'>{contactInfo.name}</Typography>
					</Grid>
				</Grid>
				<Grid item xs={12} className={classes.divider}>
					<Divider />
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={3}>
						<Grid item xs={2}>
							<Grid container justify='center'>
								<BusinessIcon />
							</Grid>
						</Grid>
						<Grid item xs={10}>
							<Typography
								color={
									contactInfo.jobTitleAndCompany
										? 'textPrimary'
										: 'textSecondary'
								}
								variant={
									contactInfo.jobTitleAndCompany
										? 'body1'
										: 'caption'
								}
							>
								{contactInfo.jobTitleAndCompany
									? contactInfo.jobTitleAndCompany
									: 'No job information saved'}
							</Typography>
						</Grid>

						<Grid item xs={2}>
							<Grid container justify='center'>
								<EmailIcon />
							</Grid>
						</Grid>
						<Grid item xs={10}>
							<Typography
								color={
									contactInfo.email
										? 'textPrimary'
										: 'textSecondary'
								}
								variant={
									contactInfo.email ? 'body1' : 'caption'
								}
							>
								{contactInfo.email
									? contactInfo.email
									: 'No email address saved'}
							</Typography>
						</Grid>
						<Grid item xs={2}>
							<Grid container justify='center'>
								<PhoneIcon />
							</Grid>
						</Grid>
						<Grid item xs={10}>
							<Typography
								color={
									contactInfo.phone
										? 'textPrimary'
										: 'textSecondary'
								}
								variant={
									contactInfo.phone ? 'body1' : 'caption'
								}
							>
								{contactInfo.phone
									? contactInfo.phone
									: 'No phone number saved'}
							</Typography>
						</Grid>
						<Grid item xs={2}>
							<Grid container justify='center'>
								<NotesIcon />
							</Grid>
						</Grid>
						<Grid item xs={10}>
							<Typography
								color={
									contactInfo.notes
										? 'textPrimary'
										: 'textSecondary'
								}
								variant={
									contactInfo.notes ? 'body1' : 'caption'
								}
							>
								{contactInfo.notes
									? contactInfo.notes
									: 'No notes saved'}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Fab
				color='primary'
				size='medium'
				variant='extended'
				className={classes.fab}
				component={Link}
				to={`/contact/${contactId}/edit`}
			>
				<EditIcon className={classes.fabIcon} />
				<Typography variant='button'>Edit contact</Typography>
			</Fab>
		</Paper>
	);
}
