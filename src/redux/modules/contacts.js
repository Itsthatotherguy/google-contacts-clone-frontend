import axios from 'axios';

//ANCHOR actions
const CREATE_CONTACT_STARTED = 'contacts/CREATE_CONTACT_STARTED';
const CREATE_CONTACT_SUCCEEDED = 'contacts/CREATE_CONTACT_SUCCEEDED';
const CREATE_CONTACT_FAILED = 'contacts/CREATE_CONTACT_FAILED';
const CLEAR_ERRORS = 'contacts/CLEAR_ERRORS';

//ANCHOR reducer
const initialState = {
    contacts: [],
    isLoading: false,
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
