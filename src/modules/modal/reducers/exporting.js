import ActionType from 'constants/actiontype.js';

let initState = {
	status: false,
	progress: 0,
	current: '',
	log: ''
}

export default (state = initState, action) => {
	switch (action.type) {
		case ActionType.EXPORTING_START:
			return state.set('status', true);
		case ActionType.EXPORTING_UPDATE:
			return state.merge(action.data);
		case ActionType.EXPORTING_ADD_LOG:
			let log = state.log + '\r\n' + action.data;
			return state.set('log', log);
		default:
			return state;
	}
}