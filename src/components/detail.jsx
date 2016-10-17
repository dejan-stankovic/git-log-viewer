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
            repository: props.repository
        }
        this.changeBranch = this.changeBranch.bind(this);
    }

    render() {
        let state = this.state;
        let tabs = [];
        tabs.push(new TabModel('Commits', <CommitsTab repository={state.repository}/>));
        tabs.push(new TabModel('Information', <InformationTab repository={state.repository}/>));
        return (
            <div>
                <BackButton/>
                <Tab data={tabs}/>
            </div>
        );
    }

    changeBranch(branch) {
        let state = this.state;
        let repository = this.state.repository;

        repository.currentBranch = branch;
        repository.users = Git.getUsers(branch);
        repository.commitsCount = Git.getCommitsCount(branch);

        this.setState({ repository: repository });
    }
}
