import Common from 'utils/common.js';

export default class ControlAction {
	static startAction() {
		return Common.getAction('CONTROL_START_ACTION');
	}

	static stopAction() {
		return Common.getAction('CONTROL_STOP_ACTION');
	}
}