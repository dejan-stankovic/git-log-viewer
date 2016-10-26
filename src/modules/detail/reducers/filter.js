import ActionType from 'constants/actiontype.js';

const initState = {
    active: false,
    userInput: '', // Store the keyword when search for user
    allUsers: [],
    filteredUsers: [],
    users: [],
    message: '',
    fromDate: '',
    toDate: ''
}

export default (state = initState, action) => {
    switch (action.type) {
        case ActionType.TOGGLE_FILTER:
            return state.set('active', !state.active);
        case ActionType.UPDATE_FILTER:
            return state.merge(action.data);
        case ActionType.SET_ALL_USERS:
        	return state.set('allUsers', action.data);
        case ActionType.SET_USERS:
            return state.set('users', action.data);
        case ActionType.SET_MESSAGE:
            return state.set('message', action.data);
        case ActionType.SET_FROM_DATE:
            return state.set('fromDate', action.data);
        case ActionType.SET_TO_DATE:
            return state.set('toDate', action.data);
        case ActionType.RESET_FILTER:
        	return state.merge({
        		userInput: '',
        		users: [],
        		message: '',
        		fromDate: '',
        		toDate: ''
        	});
        default:
            return state;
    }
}
