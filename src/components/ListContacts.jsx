//react
import React, { useState, useEffect, Fragment } from 'react';

//components
import Contact from '../components/Contact';
import CreateContactDialog from '../components/CreateContactDialog';
import EditContactDialog from '../components/EditContactDialog';
import ChangeColumnOrderDialog from '../components/ChangeColumnOrderDialog';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from '../redux/modules/contacts';
import { openChangeColumnOrderDialog } from '../redux/modules/ui';

//mui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//labs
import Skeleton from '@material-ui/lab/Skeleton';

//icon
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';

//styles
const useStyles = makeStyles(theme => ({
	wrapper: {
		width: '100%',
		textAlign: 'center',
		marginTop: theme.spacing(3),
	},
	paper: {
		margin: theme.spacing(3),
		width: '100%',
	},
	tableWrapper: {
		overflow: 'auto',
		maxHeight: '100%',
	},
	changeColumnOrderIcon: {
		marginRight: theme.spacing(2),
	},
}));

export default function() {
	//redux
	const dispatch = useDispatch();
	const {
		ui: { columns },
		contacts: { contacts, isLoading },
	} = useSelector(state => state);

	//react
	const [anchorEl, setAnchorEl] = useState(null);

	useEffect(() => {
		dispatch(fetchContacts());
	}, []);

	const handleOtherMenuOpen = e => {
		setAnchorEl(e.currentTarget);
	};

	const handleOtherMenuClose = e => {
		setAnchorEl(null);
	};

	const handleChangeColumnOrderOpen = () => {
		dispatch(openChangeColumnOrderDialog());
		handleOtherMenuClose();
	};

	//mui
	const classes = useStyles();
	return (
		<Fragment>
			<Paper className={classes.paper}>
				<div className={classes.tableWrapper}>
					<Table stickyHeader>
						<TableHead className={classes.header}>
							<TableRow>
								<TableCell>Name</TableCell>
								{columns.map((column, index) => (
									<TableCell key={index}>
										{column.label}
									</TableCell>
								))}
								<TableCell align='right'>
									<IconButton onClick={handleOtherMenuOpen}>
										<MoreVertIcon />
									</IconButton>
									<Menu
										anchorEl={anchorEl}
										keepMounted
										open={Boolean(anchorEl)}
										onClose={handleOtherMenuClose}
									>
										<MenuItem
											onClick={
												handleChangeColumnOrderOpen
											}
										>
											<TableChartOutlinedIcon
												className={
													classes.changeColumnOrderIcon
												}
											/>
											Change column order
										</MenuItem>
									</Menu>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{(isLoading
								? Array.from(new Array(5))
								: contacts
							).map((contact, index) => {
								return contact ? (
									<Contact
										key={contact.contactId}
										contact={contact}
										columns={columns}
									/>
								) : (
									<TableRow>
										<TableCell>
											<Skeleton
												height={40}
												variant='rect'
											/>
										</TableCell>
										<TableCell>
											<Skeleton
												height={40}
												variant='rect'
											/>
										</TableCell>
										<TableCell>
											<Skeleton
												height={40}
												variant='rect'
											/>
										</TableCell>
										<TableCell>
											<Skeleton
												height={40}
												variant='rect'
											/>
										</TableCell>
										<TableCell></TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</div>
				{/* {isLoading && (
					<div className={classes.wrapper}>
						<CircularProgress />
					</div>
				)} */}
				{!isLoading && contacts.length === 0 && (
					<div className={classes.wrapper}>
						<Typography variant='h6'>
							You currently have no contacts saved.
						</Typography>
					</div>
				)}
			</Paper>

			<CreateContactDialog />
			<EditContactDialog />
			<ChangeColumnOrderDialog />
		</Fragment>
	);
}
