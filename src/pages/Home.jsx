//react
import React, { useState, useEffect, Fragment } from 'react';

//components
import ListContacts from '../components/ListContacts';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from '../redux/modules/contacts';

//mui
import { makeStyles } from '@material-ui/core/styles';

//styles
const useStyles = makeStyles(theme => ({}));

const dummyData = [
	{
		firstName: 'Christiaan',
		lastName: 'van der Merwe',
		jobTitle: 'Support Manager',
		company: 'Fincon',
		email: 'chrisvdm0410@gmail.com',
		phone: '074 066 9832',
		notes: '',
	},
	{
		firstName: 'Christiaan',
		lastName: 'van der Merwe',
		jobTitle: 'Support Manager',
		company: 'Fincon',
		email: 'chrisvdm0410@gmail.com',
		phone: '074 066 9832',
		notes: '',
	},
	{
		firstName: 'Christiaan',
		lastName: 'van der Merwe',
		jobTitle: 'Support Manager',
		company: 'Fincon',
		email: 'chrisvdm0410@gmail.com',
		phone: '074 066 9832',
		notes: '',
	},
	{
		firstName: 'Christiaan',
		lastName: 'van der Merwe',
		jobTitle: 'Support Manager',
		company: 'Fincon',
		email: 'chrisvdm0410@gmail.com',
		phone: '074 066 9832',
		notes: '',
	},
	{
		firstName: 'Christiaan',
		lastName: 'van der Merwe',
		jobTitle: 'Support Manager',
		company: 'Fincon',
		email: 'chrisvdm0410@gmail.com',
		phone: '074 066 9832',
		notes: '',
	},
	{
		firstName: 'Christiaan',
		lastName: 'van der Merwe',
		jobTitle: 'Support Manager',
		company: 'Fincon',
		email: 'chrisvdm0410@gmail.com',
		phone: '074 066 9832',
		notes: '',
	},
	{
		firstName: 'Christiaan',
		lastName: 'van der Merwe',
		jobTitle: 'Support Manager',
		company: 'Fincon',
		email: 'chrisvdm0410@gmail.com',
		phone: '074 066 9832',
		notes: '',
	},
	{
		firstName: 'Christiaan',
		lastName: 'van der Merwe',
		jobTitle: 'Support Manager',
		company: 'Fincon',
		email: 'chrisvdm0410@gmail.com',
		phone: '074 066 9832',
		notes: '',
	},
	{
		firstName: 'Christiaan',
		lastName: 'van der Merwe',
		jobTitle: 'Support Manager',
		company: 'Fincon',
		email: 'chrisvdm0410@gmail.com',
		phone: '074 066 9832',
		notes: '',
	},
	{
		firstName: 'Christiaan',
		lastName: 'van der Merwe',
		jobTitle: 'Support Manager',
		company: 'Fincon',
		email: 'chrisvdm0410@gmail.com',
		phone: '074 066 9832',
		notes: '',
	},
	{
		firstName: 'Christiaan',
		lastName: 'van der Merwe',
		jobTitle: 'Support Manager',
		company: 'Fincon',
		email: 'chrisvdm0410@gmail.com',
		phone: '074 066 9832',
		notes: '',
	},
	{
		firstName: 'Christiaan',
		lastName: 'van der Merwe',
		jobTitle: 'Support Manager',
		company: 'Fincon',
		email: 'chrisvdm0410@gmail.com',
		phone: '074 066 9832',
		notes: '',
	},
	{
		firstName: 'Christiaan',
		lastName: 'van der Merwe',
		jobTitle: 'Support Manager',
		company: 'Fincon',
		email: 'chrisvdm0410@gmail.com',
		phone: '074 066 9832',
		notes: '',
	},
	{
		firstName: 'Christiaan',
		lastName: 'van der Merwe',
		jobTitle: 'Support Manager',
		company: 'Fincon',
		email: 'chrisvdm0410@gmail.com',
		phone: '074 066 9832',
		notes: '',
	},
	{
		firstName: 'Christiaan',
		lastName: 'van der Merwe',
		jobTitle: 'Support Manager',
		company: 'Fincon',
		email: 'chrisvdm0410@gmail.com',
		phone: '074 066 9832',
		notes: '',
	},
	{
		firstName: 'Christiaan',
		lastName: 'van der Merwe',
		jobTitle: 'Support Manager',
		company: 'Fincon',
		email: 'chrisvdm0410@gmail.com',
		phone: '074 066 9832',
		notes: '',
	},
	{
		firstName: 'Christiaan',
		lastName: 'van der Merwe',
		jobTitle: 'Support Manager',
		company: 'Fincon',
		email: 'chrisvdm0410@gmail.com',
		phone: '074 066 9832',
		notes: '',
	},
	{
		firstName: 'Christiaan',
		lastName: 'van der Merwe',
		jobTitle: 'Support Manager',
		company: 'Fincon',
		email: 'chrisvdm0410@gmail.com',
		phone: '074 066 9832',
		notes: '',
	},
];

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
			<ListContacts />
		</Fragment>
	);
}
