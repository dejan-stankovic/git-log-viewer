import ActionType from 'constants/actiontype.js';

export default (state = false, action) => {
    switch (action.type) {
        case ActionType.START_LOADING:
            return true;
        case ActionType.END_LOADING:
            return false;
        default:
            return state;
    }
}
