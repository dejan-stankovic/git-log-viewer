import React from 'react';
import Common from '../utils/common.js';
import Git from '../utils/git.js';
import TabModel from '../models/tab.js';

import BackButton from './shared/back-home-btn.jsx';
import Tab from './shared/tab.jsx';
import CommitsTab from './detail-childs/commits-tab.jsx';

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        let tabs = [];
        tabs.push(new TabModel('Commits', <CommitsTab git={this.props.git}/>));
        tabs.push(new TabModel('Information', <h1>{this.props.git.currentBranch}</h1>));
        return (
            <div>
                <BackButton/>
                <Tab data={tabs}/>
            </div>
        );
    }
}
