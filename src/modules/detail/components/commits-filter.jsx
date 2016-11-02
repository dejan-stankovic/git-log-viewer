import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Select } from 'modules/common';
import { CommitsAction, FilterAction } from 'modules/detail/actions';

class CommitsFilter extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        let { active, filter, setUserInput, setUsers, setMessage, 
            setFromDate, setToDate, search, reset } = this.props;
        if (!filter.active) return null;

        return (
            <div className="ui form glv-margin-top">
                <div className="fields">
                    <div className="sixteen wide field">
                        <label>Users</label>
                        <Select
                            active={active}
                            options={filter.filteredUsers}
                            selectedOptions={filter.users}
                            valueAttr="email"
                            optionAttr="disp"
                            selectedAttr="name"
                            multiple={true}
                            search={true}
                            placeHolder="Select users"
                            onChange={setUsers}
                            onInputChange={setUserInput}/>
                    </div>
                </div>
                <div className="fields">
                    <div className="ten wide field">
                        <label>Commit message</label>
                        <input type="text" value={filter.message} onChange={setMessage} placeholder="Message"/>
                    </div>
                    <div className="three wide field">
                        <label>From date</label>
                        <input type="date" value={filter.fromDate} onChange={setFromDate} placeholder="From"/>
                    </div>
                    <div className="three wide field">
                        <label>To date</label>
                        <input type="date" value={filter.toDate} onChange={setToDate} placeholder="To"/>
                    </div>
                </div>
                <div className="fields">
                    <div className="field">
                        <button className="ui blue button" onClick={search}>
                            <i className="search icon"></i> Search
                        </button>
                        <button className="ui button" onClick={reset}>
                            <i className="undo icon"></i> Reset
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    componentWillMount() {
        let { repository, updateFilter } = this.props;
        let users = repository.users.map(user => {
            return Object.assign({}, user, {
                disp: <div><strong>{user.name}</strong><br/>{user.email}</div>
            })
        });
        updateFilter({
            allUsers: users,
            filteredUsers: users
        });
    }
}

const mapStateToProps = state => {
    return {
        filter: state.filter,
        repository: state.repository
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateFilter: filter => dispatch(FilterAction.updateFilter(filter)),
        setUserInput: keyword => dispatch(FilterAction.setUserInput(keyword)),
        setUsers: users => dispatch(FilterAction.setUsers(users)),
        setMessage: e => dispatch(FilterAction.setMessage(e.target.value)),
        setFromDate: e => dispatch(FilterAction.setFromDate(e.target.value)),
        setToDate: e => dispatch(FilterAction.setToDate(e.target.value)),
        search: () => dispatch(CommitsAction.getCommits(true)),
        reset: () => {
            dispatch(FilterAction.resetFilter());
            dispatch(CommitsAction.getCommits(true));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommitsFilter);
