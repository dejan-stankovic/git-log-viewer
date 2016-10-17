import React from 'react';

import Select from '../shared/select.jsx';

export default class InformationTab extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            repository: props.repository
        }
    }

    render() {
        let repository = this.state.repository;
    	let branches = [];
    	for (let branch of repository.branches) {
            if (branch.substring(0, 7) === 'remotes') {
                branches.push(<tr key={branch}><td><div className="ui orange horizontal small label">Remote</div> {branch}</td></tr>);
            } else {
                branches.push(<tr key={branch}><td><div className="ui teal horizontal small label">Local</div> {branch}</td></tr>);
            }
    	}
    	let users = repository.users.map((user) => (
    		<tr key={user.email}>
    			<td><i className="icon user"></i> {user.name}</td>
    			<td><i className="icon mail"></i> {user.email}</td>
    		</tr>
    	));
        return (
            <div>
            	<h3>1. General Information</h3>
            	<ul>
            		<li>URL: {repository.url}</li>
            		<li>Current branch: {repository.currentBranch}</li>
            		<li>Commits: {repository.commitsCount}</li>
            		<li>Contributors: {repository.users.length}</li>
            		<li>Branches: {repository.branches.length}</li>
            	</ul>
            	<h3>2. List contributors (of current branch)</h3>
            	<table className="ui very basic compact collapsing table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
						</tr>
					</thead>
					<tbody>
						{users}
					</tbody>
            	</table>
            	<h3>3. All branches</h3>
            	<table className="ui very basic compact collapsing table">
					<tbody>
						{branches}
					</tbody>
            	</table>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.repository.currentBranch !== nextProps.repository.currentBranch) {
            this.setState({ repository: nextProps.repository });
        }
    }
}
