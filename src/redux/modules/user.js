//ANCHOR imports
import axios from 'axios';
import { setAuthorizationHeader } from '../../utils/helpers';

//ANCHOR actions
const LOGIN_USER_STARTED = 'LOGIN_USER_STARTED';
const LOGIN_USER_SUCCEEDED = 'LOGIN_USER_SUCCEEDED';
const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';
const GET_USER_DATA_STARTED = 'GET_USER_DATA_STARTED';
const GET_USER_DATA_SUCCEEDED = 'GET_USER_DATA_SUCCEEDED';
const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';
const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
const SET_UNAUTHENTICATED = 'SET_UNAUTHENTICATED';

//ANCHOR reducer
const initialState = {
    authenticated: false,
    credentials: {},
    isLoading: false,
    errors: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER_STARTED: {
            return {
                ...state,
                errors: null,
                isLoading: true,
            };
        }
        case LOGIN_USER_SUCCEEDED: {
            return {
                ...state,
                isLoading: false,
                ...action.payload,
            };
        }
        case LOGIN_USER_FAILED: {
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
function loginUserStarted() {
    return { type: LOGIN_USER_STARTED };
}

function loginUserSucceeded(userData) {
    return {
        type: LOGIN_USER_SUCCEEDED,
        payload: userData,
    };
}

function loginUserFailed(errors) {
    return {
        type: LOGIN_USER_FAILED,
        payload: errors,
    };
}

//ANCHOR side effects
export function loginUser(userData, history) {
    return dispatch => {
        dispatch(loginUserStarted());

        axios
            .post('/login', userData)
            .then(res => {
                setAuthorizationHeader(res.data.token);
                return axios('/user').get();
            })
            .then(data => {
                history.push('/');
                dispatch(loginUserSucceeded(data));
            })
            .catch(err => {
                dispatch(loginUserFailed(err.response.data));
            });
    };
}
