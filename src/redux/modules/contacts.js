import axios from 'axios';

//ANCHOR actions
const CREATE_CONTACT_STARTED = 'contacts/CREATE_CONTACT_STARTED';
const CREATE_CONTACT_SUCCEEDED = 'contacts/CREATE_CONTACT_SUCCEEDED';
const CREATE_CONTACT_FAILED = 'contacts/CREATE_CONTACT_FAILED';
const CLEAR_ERRORS = 'contacts/CLEAR_ERRORS';
const FETCH_CONTACTS_STARTED = 'contacts/FETCH_CONTACTS_STARTED';
const FETCH_CONTACTS_SUCCEEDED = 'contacts/FETCH_CONTACTS_SUCCEEDED';
const FETCH_CONTACTS_FAILED = 'contacts/FETCH_CONTACTS_FAILED';

//ANCHOR reducer
const initialState = {
    contacts: [],
    isLoading: true,
    errors: {},
};

export default function(state = initialState, action) {
    switch (action.type) {
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
                contacts: [action.payload, ...state.contacts],
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
        payload: contacts,
    };
}

function fetchContactsFailed(errors) {
    return {
        type: FETCH_CONTACTS_FAILED,
        payload: errors,
    };
}

//ANCHOR side effects
export function createContact(newContact) {
    return dispatch => {
        dispatch(createContactStarted());

        axios
            .post('/contact', newContact)
            .then(res => {
                dispatch(createContactSucceeded(res.data));
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
