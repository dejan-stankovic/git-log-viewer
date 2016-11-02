import Common from 'utils/common.js';
import CommitsAction from 'modules/detail/actions/commits.js';

export default class PagerAction {
	static changePage(page) {
        return (dispatch) => {
            dispatch(Common.getAction('CHANGE_PAGE', page));
            dispatch(CommitsAction.getCommits());
        }
    }

    static changePageSize(size) {
        return (dispatch, getState) => {
            let { pager } = getState();
            if (size === pager.size) return;
            dispatch(Common.getAction('CHANGE_PAGE_SIZE', size));
            dispatch(CommitsAction.getCommits(true));
        }
    }

    static updatePager(newProps) {
        return Common.getAction('UPDATE_PAGER', newProps);
    }
}