//ANCHOR actions
const TOGGLE_SIDEBAR = 'ui/TOGGLE-SIDEBAR';
const OPEN_CHANGE_COLUMN_ORDER_DIALOG = 'ui/OPEN_CHANGE_COLUMN_ORDER_DIALOG';
const CLOSE_CHANGE_COLUMN_ORDER_DIALOG = 'ui/CLOSE_CHANGE_COLUMN_ORDER_DIALOG';
const CHANGE_COLUMN_ORDER = 'ui/CHANGE_COLUMN_ORDER';

//ANCHOR reducer
const initialState = {
	sidebarOpen: false,
	changeColumnOrderDialogOpen: false,
	columns: [
		{ name: 'email', label: 'Email' },
		{ name: 'phone', label: 'Phone number' },
		{ name: 'jobTitleAndCompany', label: 'Job title & company' },
	],
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
		case CHANGE_COLUMN_ORDER: {
			return {
				...state,
				columns: action.payload,
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

export function changeColumnOrder(newOrder) {
	return {
		type: CHANGE_COLUMN_ORDER,
		payload: newOrder,
	};
}
