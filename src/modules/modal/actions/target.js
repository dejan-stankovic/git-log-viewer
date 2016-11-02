import Common from 'utils/common.js';
import ReadyAction from './ready.js';

export default class TargetAction {
	static updateTarget(target) {
		return (dispatch, getState) => {
			dispatch(Common.getAction('TARGET_UPDATE', target));
			dispatch(ReadyAction.setReady());
		}
	}
}