import ActionType from 'constants/actiontype.js';

const initState = {
	loading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case ActionType.CONTROL_START_ACTION:
            return state.set('loading', true);
        case ActionType.CONTROL_STOP_ACTION:
        	return state.set('loading', false);
        default:
            return state;
    }
}
