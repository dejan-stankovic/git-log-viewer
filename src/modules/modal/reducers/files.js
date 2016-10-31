import ActionType from 'constants/actiontype.js';

const initState = {
	loading: true,
	progress: 0,
	data: []
}

export default (state = initState, action) => {
	switch (action.type) {
		case ActionType.FILES_UPDATE:
			return state.merge(action.data);
		case ActionType.FILES_SET_PROGRESS:
			return state.set('progress', action.data);
		default:
			return state;
	}
}