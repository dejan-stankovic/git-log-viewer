import ActionType from 'constants/actiontype.js';

export default (state = {}, action) => {
    let newStateProp;
    switch (action.type) {
        case ActionType.CHANGE_PAGE:
            return state.set('current', action.data);
        case ActionType.CHANGE_PAGE_SIZE:
            return state.set('size', action.data);
        case ActionType.UPDATE_PAGER:
        	return state.merge(action.data);
        default:
            return state;
    }
}
