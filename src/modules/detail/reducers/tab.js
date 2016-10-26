import ActionType from 'constants/actiontype.js';

export default (state = 0, action) => {
    switch (action.type) {
        case ActionType.CHANGE_TAB:
            return action.data;
        default:
            return state;
    }
}
