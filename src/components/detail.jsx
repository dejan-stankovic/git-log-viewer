import React from 'react';
import Common from '../utils/common.js';
import Git from '../utils/git.js';
import TabModel from '../models/tab.js';

import BackButton from './shared/back-home-btn.jsx';
import Tab from './shared/tab.jsx';
import CommitsTab from './detail-childs/commits-tab.jsx';
import InformationTab from './detail-childs/information-tab.jsx';

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            users: props.users,
            commitsCount: props.commitsCount
        }
        this.changeBranch = this.changeBranch.bind(this);
    }

    render() {
        let props = this.props;
        let state = this.state;
        let tabs = [];
        let commitTab = <CommitsTab
                            git={props.git}
                            currentBranch={props.git.currentBranch}
                            branches={props.branches}
                            users={state.users}
                            commitsCount={state.commitsCount}/>
        let infoTab = <InformationTab 
                            git={props.git} 
                            currentBranch={props.git.currentBranch}
                            branches={props.branches}
                            users={state.users}
                            commitsCount={state.commitsCount}
                            changeBranch={this.changeBranch}/>
        tabs.push(new TabModel('Commits', commitTab));
        tabs.push(new TabModel('Information', infoTab));
        return (
            <div>
                <BackButton/>
                <Tab data={tabs}/>
            </div>
        );
    }

    changeBranch(branch) {
        let state = this.state;
        let git = this.props.git;

        git.currentBranch = branch;
        state.users = git.getUsers(branch);
        state.commitsCount = git.getCommitsCount(branch);

        this.setState(state);
    }
}
