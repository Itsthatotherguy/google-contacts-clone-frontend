//ANCHOR actions
const TOGGLE_SIDEBAR = 'ui/TOGGLE-SIDEBAR';

//ANCHOR reducer
const initialState = {
    sidebarOpen: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_SIDEBAR: {
            return {
                ...state,
                sidebarOpen: !state.sidebarOpen,
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
