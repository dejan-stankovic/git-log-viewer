import React from 'react';

export default class InformationTab extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
    	let git = this.props.git;
    	let branches = [];
    	for (let branch of git.branches) {
    		branches.push(<tr key={branch}><td><div className="ui teal horizontal small label">Local</div> {branch}</td></tr>);
    	}
    	for (let branch of git.remoteBranches) {
    		branches.push(<tr key={branch}><td><div className="ui orange horizontal small label">Remote</div> {branch}</td></tr>);
    	}
    	let users = git.users.map((user) => (
    		<tr key={user.email}>
    			<td><i className="icon user"></i> {user.name}</td>
    			<td><i className="icon mail"></i> {user.email}</td>
    		</tr>
    	));
        return (
            <div>
            	<h3>1. General Information</h3>
            	<ul>
            		<li>URL: {git.url}</li>
            		<li>Current branch: {git.currentBranch}</li>
            		<li>Commits: {git.commitsCount}</li>
            		<li>Contributors: {git.users.length}</li>
            		<li>Local branches: {git.branches.length}</li>
            		<li>Remote branches: {git.remoteBranches.length}</li>
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
}
