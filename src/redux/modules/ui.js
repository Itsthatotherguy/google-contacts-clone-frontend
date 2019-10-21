import axios from 'axios';

//ANCHOR actions
const TOGGLE_SIDEBAR = 'ui/TOGGLE-SIDEBAR';
const OPEN_CHANGE_COLUMN_ORDER_DIALOG = 'ui/OPEN_CHANGE_COLUMN_ORDER_DIALOG';
const CLOSE_CHANGE_COLUMN_ORDER_DIALOG = 'ui/CLOSE_CHANGE_COLUMN_ORDER_DIALOG';
const CHANGE_COLUMN_ORDER_STARTED = 'ui/CHANGE_COLUMN_ORDER_STARTED';
const CHANGE_COLUMN_ORDER_SUCCEEDED = 'ui/CHANGE_COLUMN_ORDER_SUCCEEDED';
const CHANGE_COLUMN_ORDER_FAILED = 'ui/CHANGE_COLUMN_ORDER_FAILED';
const FETCH_COLUMN_ORDER_STARTED = 'ui/FETCH_COLUMN_ORDER_STARTED';
const FETCH_COLUMN_ORDER_SUCCEEDED = 'ui/FETCH_COLUMN_ORDER_SUCCEEDED';
const FETCH_COLUMN_ORDER_FAILED = 'ui/FETCH_COLUMN_ORDER_FAILED';

//ANCHOR reducer
const initialState = {
    sidebarOpen: false,
    changeColumnOrderDialogOpen: false,
    columns: [],
    isLoading: false,
    errors: {},
};

export default function(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_SIDEBAR: {
            return {
                ...state,
                sidebarOpen: !state.sidebarOpen,
            };
        }
        case OPEN_CHANGE_COLUMN_ORDER_DIALOG: {
            return {
                ...state,
                changeColumnOrderDialogOpen: true,
            };
        }
        case CLOSE_CHANGE_COLUMN_ORDER_DIALOG: {
            return {
                ...state,
                changeColumnOrderDialogOpen: false,
            };
        }
        case CHANGE_COLUMN_ORDER_STARTED: {
            return {
                ...state,
                isLoading: true,
                errors: {},
            };
        }
        case CHANGE_COLUMN_ORDER_SUCCEEDED: {
            return {
                ...state,
                isLoading: false,
            };
        }
        case CHANGE_COLUMN_ORDER_FAILED: {
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        }
        case FETCH_COLUMN_ORDER_STARTED: {
            return {
                ...state,
                isLoading: true,
                errors: {},
            };
        }
        case FETCH_COLUMN_ORDER_SUCCEEDED: {
            return {
                ...state,
                isLoading: false,
                columns: action.payload,
            };
        }
        case FETCH_COLUMN_ORDER_FAILED: {
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
export function toggleSidebar() {
    return {
        type: TOGGLE_SIDEBAR,
    };
}

export function openChangeColumnOrderDialog() {
    return {
        type: OPEN_CHANGE_COLUMN_ORDER_DIALOG,
    };
}

export function closeChangeColumnOrderDialog() {
    return {
        type: CLOSE_CHANGE_COLUMN_ORDER_DIALOG,
    };
}

function fetchColumnOrderStarted() {
    return {
        type: FETCH_COLUMN_ORDER_STARTED,
    };
}

function fetchColumnOrderSucceeded(columnOrder) {
    return {
        type: FETCH_COLUMN_ORDER_SUCCEEDED,
        payload: columnOrder,
    };
}

function fetchColumnOrderFailed(errors) {
    return {
        type: FETCH_COLUMN_ORDER_FAILED,
        payload: errors,
    };
}

function changeColumnOrderStarted() {
    return {
        type: CHANGE_COLUMN_ORDER_STARTED,
    };
}

function changeColumnOrderSucceeded() {
    return {
        type: CHANGE_COLUMN_ORDER_SUCCEEDED,
    };
}

function changeColumnOrderFailed(error) {
    return {
        type: CHANGE_COLUMN_ORDER_FAILED,
        payload: error,
    };
}

//ANCHOR side-effects
export function fetchColumnOrder() {
    return dispatch => {
        dispatch(fetchColumnOrderStarted());

        axios
            .get('/column-order')
            .then(res => {
                dispatch(fetchColumnOrderSucceeded(res.data));
            })
            .catch(err => {
                dispatch(fetchColumnOrderFailed(err));
            });
    };
}

export function changeColumnOrder(newOrder) {
    return dispatch => {
        dispatch(changeColumnOrderStarted());

        axios
            .post('/column-order', newOrder)
            .then(() => {
                dispatch(changeColumnOrderSucceeded());
                dispatch(fetchColumnOrder());
            })
            .catch(err => {
                dispatch(changeColumnOrderFailed(err));
            });
    };
}
