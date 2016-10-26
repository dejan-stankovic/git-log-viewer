import Common from 'utils/common.js';
import Git from 'utils/git.js';
import CommitsAction from 'modules/detail/actions/commits.js';
import PagerAction from 'modules/detail/actions/pager.js';

export default class FilterAction {
    static toggleFilter() {
        return Common.getAction('TOGGLE_FILTER');
    }

    static updateFilter(newProps) {
    	return Common.getAction('UPDATE_FILTER', newProps);
    }

    static setUserInput(keyword) {
        return (dispatch, getState) => {
            let { filter } = getState();
            let key = keyword.toLowerCase();
            let filteredUsers = filter.allUsers.filter(user => {
                let name = user.name.toLowerCase();
                let email = user.email.toLowerCase();
                if (name.indexOf(key) > -1 || email.indexOf(key) > -1) return true;
                return false;
            })
            dispatch(Common.getAction('UPDATE_FILTER', {
            	userInput: keyword,
            	filteredUsers: filteredUsers
            }));
        }
    }

    static setAllUsers(allUsers) {
    	return Common.getAction('SET_ALL_USERS', allUsers);
    }

    static setUsers(users) {
        return Common.getAction('SET_USERS', users);
    }

    static setMessage(message) {
        return Common.getAction('SET_MESSAGE', message);
    }

    static setFromDate(fromDate) {
        return Common.getAction('SET_FROM_DATE', fromDate);
    }

    static setToDate(toDate) {
        return Common.getAction('SET_TO_DATE', toDate);
    }

    static resetFilter() {
        return Common.getAction('RESET_FILTER');
    }
}
