import Common from 'utils/common.js';
import ReadyAction from './ready.js';

export default class DiffTypeAction {
	static updateDiffType(diffType) {
		return (dispatch, getState) => {
			dispatch(Common.getAction('DIFF_TYPE_UPDATE', diffType));
			dispatch(ReadyAction.setReady());
		}
	}
}