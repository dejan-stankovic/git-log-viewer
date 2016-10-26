import Common from 'utils/common.js';
import Git from 'utils/git.js';
import PagerAction from 'modules/detail/actions/pager.js';
import SelectionAction from 'modules/detail/actions/selection.js';

export default class CommitsAction {
    static startGetCommits() {
        return Common.getAction('START_GET_COMMITS')
    }

    static getCommits(isUpdateTotalPage) {
        return (dispatch, getState) => {
            dispatch(this.startGetCommits());
            let { repository, pager, filter } = getState(), promise;
            if (isUpdateTotalPage) {
                promise = Git.getCommitsCount(repository.currentBranch,
                    filter.users, filter.message, filter.fromDate, filter.toDate);
            } else {
                promise = Promise.resolve(-1);
            }
            promise.then(count => {
                let current = pager.current;
                if (count > -1) {
                    let total = Math.ceil(count / pager.size);
                    if (current > total) current = total;
                    dispatch(PagerAction.updatePager({ current, total }));
                }
                return Git.getCommits(current, pager.size, repository.currentBranch,
                    filter.users, filter.message, filter.fromDate, filter.toDate);
            }).then(commits => {
                dispatch(this.endGetCommits(commits));
            }).catch(err => {
                dispatch(this.endGetCommits([]));
            });

        }
    }

    static endGetCommits(commits) {
        return dispatch => {
            dispatch(SelectionAction.deselectAll());
            dispatch(Common.getAction('END_GET_COMMITS', commits));
        }
    }
}
