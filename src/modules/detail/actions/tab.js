import Common from 'utils/common.js';

export default class TabAction {
	static changeTab(index) {
		return Common.getAction('CHANGE_TAB', index);
	}
}