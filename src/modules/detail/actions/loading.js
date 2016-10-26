import Common from 'utils/common.js';

export default class LoadingAction {
	static startLoading() {
		return Common.getAction('START_LOADING');
	}

	static endLoading() {
		return Common.getAction('END_LOADING');
	}
}