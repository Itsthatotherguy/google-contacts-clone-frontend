//react
import React, { useState, useEffect } from 'react';

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

export default function Contact({ contact, columns }) {
	//redux
	const dispatch = useDispatch();

	const handleOpen = () => {
		dispatch(openEditContactModal(contact.contactId));
	};

	//react
	const [hovered, setHovered] = useState(false);

	useEffect(() => {
		console.log('Column rearranged');
	}, []);

	const handleMouseEnter = e => {
		setHovered(true);
	};

	const handleMouseLeave = e => {
		setHovered(false);
	};

	//mui
	const classes = useStyles();

	const avatarLetters = (
		contact.firstName.charAt(0) + contact.lastName.charAt(0)
	).toUpperCase();

	const cellInfo = {
		name: `${contact.firstName} ${contact.lastName}`,
		email: contact.email,
		phone: contact.phone,
		jobTitleAndCompany:
			contact.jobTitle && contact.company
				? `${contact.jobTitle}, ${contact.company}`
				: contact.jobTitle
				? contact.JobTitle
				: contact.company,
	};

	return (
		<TableRow
			key={contact.contactId}
			hover
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<TableCell>
				<section className={classes.name}>
					<Avatar className={classes.avatar}>{avatarLetters}</Avatar>
					{cellInfo.name}
				</section>
			</TableCell>
			{columns.map((column, index) => (
				<TableCell key={index}>{cellInfo[column.name]}</TableCell>
			))}
			<TableCell>
				<IconButton
					className={!hovered ? classes.hidden : ''}
					onClick={handleOpen}
				>
					<EditIcon fontSize='small' />
				</IconButton>
			</TableCell>
		</TableRow>
	);
}
