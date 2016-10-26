import ActionType from 'constants/actiontype.js';

export default (state = {}, action) => {
    switch (action.type) {
    	case ActionType.UPDATE_REPOSITORY:
    		return state.merge(action.data);
    	case ActionType.CHANGE_BRANCH:
            return state.set('currentBranch', action.data);
    	default:
    		return state;
    }
}
