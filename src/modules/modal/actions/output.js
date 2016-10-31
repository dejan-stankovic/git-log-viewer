import Common from 'utils/common.js';
import ReadyAction from './ready.js';

export default class OutputAction {
	static updateOutput(output) {
		return (dispatch) => {
			dispatch(Common.getAction('OUTPUT_UPDATE', output));
			dispatch(ReadyAction.setReady());
		}
	}
}