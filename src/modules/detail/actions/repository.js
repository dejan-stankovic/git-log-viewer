import Common from 'utils/common.js';
import Git from 'utils/git.js';
import CommitsAction from 'modules/detail/actions/commits.js';
import FilterAction from 'modules/detail/actions/filter.js';
import LoadingAction from 'modules/detail/actions/loading.js';

export default class PagerAction {
	static fetchAll() {
        return (dispatch) => {
            dispatch(LoadingAction.startLoading());
            Git.fetchAll()
                .then(() => {
                    dispatch(this.getBranchInfo());
                }).catch(err => {
                    Common.showErrorBox('Error', err);
                    dispatch(LoadingAction.endLoading());
                });
        }
    }

    static getBranchInfo() {
        return (dispatch, getState) => {
            dispatch(LoadingAction.startLoading());
            let promises = [];
            let { repository } = getState();
            promises.push(Git.getBranches());
            promises.push(Git.getUsers(repository.currentBranch));
            promises.push(Git.getCommitsCount(repository.currentBranch));
            Promise.all(promises).then(values => {
                let repository = {
                    branches: values[0],
                    users: values[1],
                    commitsCount: values[2]
                }
                dispatch(this.updateRepository(repository));
                dispatch(LoadingAction.endLoading());
            }).catch(err => {
                Common.showErrorBox('Error', err);
                dispatch(LoadingAction.endLoading());
            })
        }
    }

    static updateRepository(repository) {
        return Common.getAction('UPDATE_REPOSITORY', repository);
    }

    static changeBranch(newBranch) {
        return (dispatch) => {
            dispatch(Common.getAction('CHANGE_BRANCH', newBranch));
            dispatch(FilterAction.resetFilter());
            dispatch(this.getBranchInfo());
        }
    }
}