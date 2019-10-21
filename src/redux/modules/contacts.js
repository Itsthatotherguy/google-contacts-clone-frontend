import axios from 'axios';
import { createSelector } from 'reselect';

//ANCHOR actions
const CREATE_CONTACT_STARTED = 'contacts/CREATE_CONTACT_STARTED';
const CREATE_CONTACT_SUCCEEDED = 'contacts/CREATE_CONTACT_SUCCEEDED';
const CREATE_CONTACT_FAILED = 'contacts/CREATE_CONTACT_FAILED';
const CLEAR_ERRORS = 'contacts/CLEAR_ERRORS';
const FETCH_CONTACTS_STARTED = 'contacts/FETCH_CONTACTS_STARTED';
const FETCH_CONTACTS_SUCCEEDED = 'contacts/FETCH_CONTACTS_SUCCEEDED';
const FETCH_CONTACTS_FAILED = 'contacts/FETCH_CONTACTS_FAILED';
const OPEN_CREATE_CONTACT_DIALOG = 'contacts/OPEN_CREATE_CONTACT_DIALOG';
const CLOSE_CREATE_CONTACT_DIALOG = 'contacts/CLOSE_CREATE_CONTACT_DIALOG';
const CHANGE_NEW_CONTACT_INFO = 'contacts/CHANGE_NEW_CONTACT_INFO';
const OPEN_EDIT_CONTACT_DIALOG_STARTED =
	'contacts/OPEN_EDIT_CONTACT_DIALOG_STARTED';
const OPEN_EDIT_CONTACT_DIALOG_WITH_CACHED_DATA =
	'/contacts/OPEN_EDIT_CONTACT_DIALOG_WITH_CACHED_DATA';
const OPEN_EDIT_CONTACT_DIALOG_SUCCEEDED =
	'contacts/OPEN_EDIT_CONTACT_DIALOG_SUCCEEDED';
const OPEN_EDIT_CONTACT_DIALOG_FAILED =
	'contacts/OPEN_EDIT_CONTACT_DIALOG_FAILED';
const CLOSE_EDIT_CONTACT_DIALOG = 'contacts/CLOSE_EDIT_CONTACT_DIALOG';
const CHANGE_EDIT_CONTACT_INFO = 'contacts/CHANGE_EDIT_CONTACT_INFO';
const EDIT_CONTACT_STARTED = 'contacts/EDIT_CONTACT_STARTED';
const EDIT_CONTACT_SUCCEEDED = 'contacts/EDIT_CONTACT_SUCCEEDED';
const EDIT_CONTACT_FAILED = 'contacts/EDIT_CONTACT_FAILED';
const FILTER_CONTACTS = 'contacts/FILTER_CONTACTS';

//ANCHOR reducer
const initialState = {
	contacts: [],
	isLoading: true,
	errors: {},
	filterLetter: 'All',
	createContact: {
		showModal: false,
		newContact: {
			firstName: '',
			lastName: '',
			jobTitle: '',
			company: '',
			email: '',
			phone: '',
			notes: '',
		},
	},
	editContact: {
		showModal: false,
		isLoading: false,
		isSaving: false,
		errors: {},
		contactId: null,
		contact: {
			firstName: '',
			lastName: '',
			jobTitle: '',
			company: '',
			email: '',
			phone: '',
			notes: '',
		},
	},
};

export default function(state = initialState, action) {
	switch (action.type) {
		case OPEN_CREATE_CONTACT_DIALOG: {
			return {
				...state,
				createContact: {
					...state.createContact,
					showModal: true,
				},
			};
		}
		case CLOSE_CREATE_CONTACT_DIALOG: {
			return {
				...state,
				createContact: initialState.createContact,
				errors: {},
			};
		}
		case CHANGE_NEW_CONTACT_INFO: {
			return {
				...state,
				createContact: {
					...state.createContact,
					newContact: {
						...state.createContact.newContact,
						[action.payload.name]: action.payload.value,
					},
				},
			};
		}
		case CREATE_CONTACT_STARTED: {
			return {
				...state,
				errors: {},
				isLoading: true,
			};
		}
		case CREATE_CONTACT_SUCCEEDED: {
			return {
				...state,
				isLoading: false,
				// contacts: [action.payload, ...state.contacts],
				editContact: {
					...state.editContact,
					contactId: action.payload,
					contact: state.createContact.newContact,
				},
				createContact: initialState.createContact,
			};
		}
		case CREATE_CONTACT_FAILED: {
			return {
				...state,
				isLoading: false,
				errors: action.payload,
			};
		}
		case OPEN_EDIT_CONTACT_DIALOG_STARTED: {
			return {
				...state,
				editContact: {
					...state.editContact,
					showModal: true,
					isLoading: true,
					errors: {},
				},
			};
		}
		case OPEN_EDIT_CONTACT_DIALOG_WITH_CACHED_DATA: {
			return {
				...state,
				editContact: {
					...state.editContact,
					isLoading: false,
				},
			};
		}
		case OPEN_EDIT_CONTACT_DIALOG_SUCCEEDED: {
			return {
				...state,
				editContact: {
					...state.editContact,
					isLoading: false,
					contactId: action.payload.contactId,
					contact: action.payload.contact,
				},
			};
		}
		case OPEN_EDIT_CONTACT_DIALOG_FAILED: {
			return {
				...state,
				editContact: {
					...state.editContact,
					isLoading: false,
					errors: action.payload,
				},
			};
		}
		case CLOSE_EDIT_CONTACT_DIALOG: {
			return {
				...state,
				editContact: {
					...state.editContact,
					showModal: initialState.editContact.showModal,
					isLoading: initialState.editContact.isLoading,
					isSaving: initialState.editContact.isSaving,
					errors: initialState.editContact.errors,
				},
			};
		}
		case CHANGE_EDIT_CONTACT_INFO: {
			return {
				...state,
				editContact: {
					...state.editContact,
					contact: {
						...state.editContact.contact,
						[action.payload.name]: action.payload.value,
					},
				},
			};
		}
		case EDIT_CONTACT_STARTED: {
			return {
				...state,
				errors: {},
				isLoading: true,
				editContact: {
					...state.editContact,
					isSaving: true,
				},
			};
		}
		case EDIT_CONTACT_SUCCEEDED: {
			return {
				...state,
				isLoading: false,
				// contacts: [action.payload, ...state.contacts],
				editContact: {
					...state.editContact,
					showModal: initialState.editContact.showModal,
					isLoading: initialState.editContact.isLoading,
					isSaving: initialState.editContact.isSaving,
					errors: initialState.editContact.errors,
				},
			};
		}
		case EDIT_CONTACT_FAILED: {
			return {
				...state,
				isLoading: false,
				editContact: {
					...state.editContact,
					errors: action.payload,
					isSaving: false,
				},
			};
		}
		case FETCH_CONTACTS_STARTED: {
			return {
				...state,
				isLoading: true,
				errors: {},
			};
		}
		case FETCH_CONTACTS_SUCCEEDED: {
			return {
				...state,
				isLoading: false,
				contacts: action.payload,
			};
		}
		case FETCH_CONTACTS_FAILED: {
			return {
				...state,
				isLoading: false,
				errors: action.payload,
			};
		}
		case CLEAR_ERRORS: {
			return {
				...state,
				errors: {},
			};
		}
		case FILTER_CONTACTS: {
			return {
				...state,
				filterLetter: action.payload,
			};
		}
		default:
			return state;
	}
}
//ANCHOR action creators
export function openCreateContactModal() {
	return {
		type: OPEN_CREATE_CONTACT_DIALOG,
	};
}

export function closeCreateContactModal() {
	return {
		type: CLOSE_CREATE_CONTACT_DIALOG,
	};
}

export function changeNewContactInfo(newContactInfo) {
	return {
		type: CHANGE_NEW_CONTACT_INFO,
		payload: newContactInfo,
	};
}

function createContactStarted() {
	return {
		type: CREATE_CONTACT_STARTED,
	};
}

function createContactSucceeded(newContactId) {
	return {
		type: CREATE_CONTACT_SUCCEEDED,
		payload: newContactId,
	};
}

function createContactFailed(errors) {
	return {
		type: CREATE_CONTACT_FAILED,
		payload: errors,
	};
}

function openEditContactModalStarted() {
	return {
		type: OPEN_EDIT_CONTACT_DIALOG_STARTED,
	};
}

function openEditContactModalWithCachedData() {
	return {
		type: OPEN_EDIT_CONTACT_DIALOG_WITH_CACHED_DATA,
	};
}

function openEditContactModalSucceeded({ contactId, contact }) {
	return {
		type: OPEN_EDIT_CONTACT_DIALOG_SUCCEEDED,
		payload: { contactId, contact },
	};
}

function openEditContactModalFailed(errors) {
	return {
		type: OPEN_EDIT_CONTACT_DIALOG_FAILED,
		payload: errors,
	};
}

export function closeEditContactModal() {
	return {
		type: CLOSE_EDIT_CONTACT_DIALOG,
	};
}

export function changeEditContactInfo(editContactInfo) {
	return {
		type: CHANGE_EDIT_CONTACT_INFO,
		payload: editContactInfo,
	};
}

function editContactStarted() {
	return {
		type: EDIT_CONTACT_STARTED,
	};
}

function editContactSucceeded() {
	return {
		type: EDIT_CONTACT_SUCCEEDED,
	};
}

function editContactFailed(errors) {
	return {
		type: EDIT_CONTACT_FAILED,
		payload: errors,
	};
}

function fetchContactsStarted() {
	return {
		type: FETCH_CONTACTS_STARTED,
	};
}

function fetchContactsSucceeded(contacts) {
	return {
		type: FETCH_CONTACTS_SUCCEEDED,
		isLoading: false,
		payload: contacts,
	};
}

function fetchContactsFailed(errors) {
	return {
		type: FETCH_CONTACTS_FAILED,
		isLoading: false,
		payload: errors,
	};
}

export function clearErrors() {
	return {
		type: CLEAR_ERRORS,
	};
}

export function filterContacts(filterLetter) {
	return {
		type: FILTER_CONTACTS,
		payload: filterLetter,
	};
}

//ANCHOR side effects
export function createContact() {
	return (dispatch, getState) => {
		dispatch(createContactStarted());

		const newContact = getState().contacts.createContact.newContact;

		axios
			.post('/contact', newContact)
			.then(res => {
				dispatch(createContactSucceeded(res.data.contactId));
				dispatch(fetchContacts());
			})
			.catch(err => {
				console.log(err.response);

				dispatch(createContactFailed(err.response.data));
			});
	};
}

export function fetchContacts() {
	return dispatch => {
		dispatch(fetchContactsStarted());

		axios
			.get('/contacts')
			.then(res => {
				dispatch(fetchContactsSucceeded(res.data));
			})
			.catch(err => {
				dispatch(fetchContactsFailed(err.response.data));
			});
	};
}

export function openEditContactModal(contactId) {
	return (dispatch, getState) => {
		dispatch(openEditContactModalStarted());

		if (getState().contacts.editContact.contactId === contactId) {
			dispatch(openEditContactModalWithCachedData());
		} else {
			axios
				.get(`/contact/${contactId}`)
				.then(res => {
					const payload = { contactId, contact: res.data };
					dispatch(openEditContactModalSucceeded(payload));
				})
				.catch(err => {
					dispatch(openEditContactModalFailed(err.message));
				});
		}
	};
}

export function editContact() {
	return (dispatch, getState) => {
		dispatch(editContactStarted());

		const { contactId, contact } = getState().contacts.editContact;

		axios
			.post(`/contact/${contactId}`, contact)
			.then(res => {
				dispatch(editContactSucceeded());
				dispatch(fetchContacts());
			})
			.catch(err => {
				dispatch(editContactFailed(err));
			});
	};
}

//ANCHOR selectors
export const contactSelector = contactId =>
	createSelector(
		state => state.contacts.contacts,
		contacts => contacts.find(contact => contact.contactId === contactId)
	);
