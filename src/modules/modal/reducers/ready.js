import ActionType from 'constants/actiontype.js';

export default (state = false, action) => {
	switch (action.type) {
		case ActionType.READY_UPDATE:
			return action.data;
		default:
			return state;
	}
}