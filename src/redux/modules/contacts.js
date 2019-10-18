import axios from 'axios';

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

//ANCHOR reducer
const initialState = {
    contacts: [],
    isLoading: true,
    errors: {},
    createContact: {
        showCreateContactDialog: false,
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
};

export default function(state = initialState, action) {
    switch (action.type) {
        case OPEN_CREATE_CONTACT_DIALOG: {
            return {
                ...state,
                createContact: {
                    ...state.createContact,
                    showCreateContactDialog: true,
                },
            };
        }
        case CLOSE_CREATE_CONTACT_DIALOG: {
            return {
                ...state,
                createContact: initialState.createContact,
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
        case CLEAR_ERRORS: {
            return {
                ...state,
                errors: {},
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

function createContactSucceeded(newContact) {
    return {
        type: CREATE_CONTACT_SUCCEEDED,
        payload: newContact,
    };
}

function createContactFailed(errors) {
    return {
        type: CREATE_CONTACT_FAILED,
        payload: errors,
    };
}

export function clearErrors() {
    return {
        type: CLEAR_ERRORS,
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

//ANCHOR side effects
export function createContact() {
    return (dispatch, getState) => {
        dispatch(createContactStarted());

        const newContact = getState().contacts.createContact.newContact;

        axios
            .post('/contact', newContact)
            .then(res => {
                dispatch(createContactSucceeded(res.data));
                dispatch(fetchContacts());
            })
            .catch(err => {
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
