import React from 'react';
import ReactDOM from 'react-dom';

import Select from '../shared/select.jsx';

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { active: props.active, selectedUsers: [] };

        this.selectUsers = this.selectUsers.bind(this);
        this.search = this.search.bind(this);
        this.clear = this.clear.bind(this);
    }

    render() {
        let className = this.state.active ? '' : 'glv-hidden';
        let allUsers = this.props.users.map(user => {
            user.disp = <div><strong>{user.name}</strong><br/>{user.email}</div>;
            return user;
        });
        let userFilter = (user, keyword) => {
            let name = user.name.toLowerCase();
            let email = user.email.toLowerCase();
            let key = keyword.toLowerCase();
            if (name.indexOf(key) > -1 || email.indexOf(key) > -1) return true;
            return false;
        };
        return (
            <div className={'ui form ' + className}>
                <div className="fields">
                    <div className="sixteen wide field">
                        <label>Users</label>
                        <Select
                            options={allUsers}
                            valueAttr="email"
                            textAttr="name"
                            optionAttr="disp"
                            selectedAttr="name"
                            multiple="true"
                            searchable="true"
                            placeHolder="Select users"
                            onUpdate={this.selectUsers}
                            customFilter={userFilter}
                            selectedOptions={this.state.selectedUsers}/>
                    </div>
                </div>
                <div className="fields">
                    <div className="ten wide field">
                        <label>Commit message</label>
                        <input type="text" placeholder="Message" ref="message"/>
                    </div>
                    <div className="three wide field">
                        <label>From date</label>
                        <input type="date" placeholder="From" ref="fromDate"/>
                    </div>
                    <div className="three wide field">
                        <label>To date</label>
                        <input type="date" placeholder="To" ref="toDate"/>
                    </div>
                </div>
                <div className="fields">
                    <div className="field">
                        <button className="ui blue button" onClick={this.search}>
                            <i className="search icon"></i> Search
                        </button>
                        <button className="ui button" onClick={this.clear}>
                            <i className="undo icon"></i> Clear
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.message = ReactDOM.findDOMNode(this.refs.message);
        this.fromDate = ReactDOM.findDOMNode(this.refs.fromDate);
        this.toDate = ReactDOM.findDOMNode(this.refs.toDate);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ active: nextProps.active });
    }

    selectUsers(users) {
        this.state.selectedUsers = users;
    }

    search() {
        this.props.search(this.state.selectedUsers, this.message.value, 
            this.fromDate.value, this.toDate.value);
    }

    clear() {
        this.message.value = '';
        this.fromDate.value = '';
        this.toDate.value = '';
        this.setState({ selectedUsers: [] });
    }
}
