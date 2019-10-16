//ANCHOR imports
import axios from 'axios';
import { setAuthorizationHeader } from '../../utils/helpers';

//ANCHOR actions
const LOGIN_USER_STARTED = 'user/LOGIN_USER_STARTED';
const LOGIN_USER_SUCCEEDED = 'user/LOGIN_USER_SUCCEEDED';
const LOGIN_USER_FAILED = 'user/LOGIN_USER_FAILED';
const LOGOUT_USER_SUCCEEDED = 'user/LOGOUT_USER_SUCCEEDED';
const SET_AUTHENTICATED = 'user/SET_AUTHENTICATED';
const SET_UNAUTHENTICATED = 'user/SET_UNAUTHENTICATED';
const GET_USER_DATA_STARTED = 'user/GET_USER_DATA_STARTED';
const GET_USER_DATA_SUCCEEDED = 'user/GET_USER_DATA_SUCCEEDED';
const GET_USER_DATA_FAILED = 'user/GET_USER_DATA_FAILED';

//ANCHOR reducer
const initialState = {
    authenticated: false,
    credentials: {},
    isLoading: false,
    errors: {},
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED: {
            return {
                ...state,
                authenticated: true,
            };
        }
        case SET_UNAUTHENTICATED: {
            return {
                ...state,
                authenticated: false,
            };
        }
        case LOGIN_USER_STARTED: {
            return {
                ...state,
                errors: {},
                isLoading: true,
            };
        }
        case LOGIN_USER_SUCCEEDED: {
            return {
                ...state,
                isLoading: false,
                authenticated: true,
            };
        }
        case LOGIN_USER_FAILED: {
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        }
        case GET_USER_DATA_STARTED: {
            return {
                ...state,
                errors: {},
                isLoading: true,
            };
        }
        case GET_USER_DATA_SUCCEEDED: {
            return {
                ...state,
                isLoading: false,
                credentials: action.payload,
            };
        }
        case GET_USER_DATA_FAILED: {
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        }
        case LOGOUT_USER_SUCCEEDED: {
            return initialState;
        }
        default:
            return state;
    }
}

//ANCHOR action creators
function loginUserStarted() {
    return { type: LOGIN_USER_STARTED };
}

function loginUserSucceeded() {
    return {
        type: LOGIN_USER_SUCCEEDED,
    };
}

function loginUserFailed(errors) {
    return {
        type: LOGIN_USER_FAILED,
        payload: errors,
    };
}

export function setAuthenticated() {
    return { type: SET_AUTHENTICATED };
}

function setUnauthenticated() {
    return { type: SET_UNAUTHENTICATED };
}

function getUserDataStarted() {
    return {
        type: GET_USER_DATA_STARTED,
    };
}

function getUserDataSucceeded(userData) {
    return {
        type: GET_USER_DATA_SUCCEEDED,
        payload: userData,
    };
}

function getUserDataFailed(error) {
    return {
        type: GET_USER_DATA_SUCCEEDED,
        payload: error,
    };
}

//ANCHOR side effects
export function getUserData() {
    return dispatch => {
        dispatch(getUserDataStarted());
        axios
            .get('/user')
            .then(res => {
                dispatch(getUserDataSucceeded(res.data.credentials));
            })
            .catch(err => {
                dispatch(getUserDataFailed(err));
            });
    };
}

export function loginUser(userData, history) {
    return dispatch => {
        dispatch(loginUserStarted());

        axios
            .post('/login', userData)
            .then(res => {
                return setAuthorizationHeader(res.data.token);
            })
            .then(() => {
                dispatch(setAuthenticated());
                dispatch(getUserData());
                dispatch(loginUserSucceeded());
                history.push('/');
            })
            .catch(err => {
                console.log(err);

                dispatch(loginUserFailed(err.response.data));
            });
    };
}

export function logoutUser() {
    return dispatch => {
        localStorage.removeItem('FBIdToken');
        delete axios.defaults.headers.common['Authorization'];
        dispatch(setUnauthenticated());
    };
}
