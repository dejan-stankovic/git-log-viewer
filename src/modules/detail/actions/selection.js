import Common from 'utils/common.js';

export default class SelectionTab {
	static toggleSelectAll() {
		return (dispatch, getState) => {
			let { commits, selection } = getState();
			let indexes = [], isAll = false;
			if (!selection.isAll) {
				indexes = commits.data.map((commit, i) => i);
				isAll = true;
			}
			dispatch(Common.getAction('UPDATE_SELECTION', { isAll, indexes }));
		}
	}

	static toggleSelect(index) {
		return (dispatch, getState) => {
			let { commits, selection } = getState();
			let indexes = [...selection.indexes], isAll = selection.isAll;
			let i = indexes.indexOf(index);
			if (i === -1) {
				indexes.push(index);
				if (commits.data.length === indexes.length) isAll = true;
			} else {
				indexes.splice(i, 1);
				if (isAll) isAll = false;
			}
			dispatch(Common.getAction('UPDATE_SELECTION', { isAll, indexes }));
		}
	}

	static deselectAll() {
		return Common.getAction('UPDATE_SELECTION', {
			isAll: false,
			indexes: []
		});
	}
}