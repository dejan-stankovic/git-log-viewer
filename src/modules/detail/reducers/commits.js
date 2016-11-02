import ActionType from 'constants/actiontype.js';

export default (state = { loading: true, data: [] }, action) => {
    switch (action.type) {
        case ActionType.START_GET_COMMITS:
            return state.set('loading', true);
        case ActionType.END_GET_COMMITS:
            return state.merge({
                loading: false,
                data: action.data
            });
        default:
            return state;
    }
}
