import ActionType from 'constants/actiontype.js';

const initState = {
	isAll: false,
	indexes: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case ActionType.UPDATE_SELECTION:
            return state.merge(action.data);
        default:
            return state;
    }
}
