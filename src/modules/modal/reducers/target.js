import ActionType from 'constants/actiontype.js';

export default (state = [], action) => {
	switch (action.type) {
		case ActionType.TARGET_UPDATE:
			return action.data;
		default:
			return state;
	}
}