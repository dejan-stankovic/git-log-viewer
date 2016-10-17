import React from 'react';

import Select from '../shared/select.jsx';

export default class InformationTab extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.changeBranch = this.changeBranch.bind(this);
    }

    render() {
        let props = this.props;
    	let git = props.git;
    	let branches = [];
    	for (let branch of props.branches) {
            if (branch.substring(0, 7) === 'remotes') {
                branches.push(<tr key={branch}><td><div className="ui orange horizontal small label">Remote</div> {branch}</td></tr>);
            } else {
                branches.push(<tr key={branch}><td><div className="ui teal horizontal small label">Local</div> {branch}</td></tr>);
            }
    	}
    	let users = props.users.map((user) => (
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
            		<li>
                        Current branch:&nbsp;&nbsp;
                        <Select 
                            options={props.branches}
                            selectedOptions={[git.currentBranch]}
                            stringOption="true"
                            inline="true"
                            onUpdate={this.changeBranch}/>
                    </li>
            		<li>Commits: {props.commitsCount}</li>
            		<li>Contributors: {props.users.length}</li>
            		<li>Branches: {props.branches.length}</li>
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

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props !== nextProps) {
            return true;
        }
        return false;
    }

    changeBranch(selectedBranches) {
        let branch = selectedBranches[0];
        this.props.changeBranch(branch);
    }
}
