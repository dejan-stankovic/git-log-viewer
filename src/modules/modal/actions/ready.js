import Common from 'utils/common.js';

export default class ReadyAction {
	static setReady() {
		return (dispatch, getState) => {
			let { data, target, diffType, output } = getState();
			if (target[0] === data.currentBranch || diffType.length === 0 || output === '') {
				dispatch(Common.getAction('READY_UPDATE', false));
			} else {
				dispatch(Common.getAction('READY_UPDATE', true));
			}
			
		}
	}
}