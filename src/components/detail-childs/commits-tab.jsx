import React from 'react';
import * as AppConst from '../../appconst.js';
import Git from '../../utils/git.js';

import Pager from '../shared/pager.jsx';
import Row from './row.jsx';

export default class CommitsTab extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            loading: true,
            currentPage: 1,
            pageSize: AppConst.PAGER_DEFAULT_SIZE
        };
    }

    render() {
        if (this.state.loading) {
            return this.showLoader();
        }
        let commits = this.commits;
        if (commits === null) {
            return this.showError('Empty data', ['Could not read commit log from Git directory.', 'Please try again.']);
        }
        let rows = commits.map((commit) => <Row key={commit.hash} commit={commit} git={this.props.git}/>);
        return (
            <div>
                <Pager currentPage={this.state.currentPage} totalPage={this.state.totalPage} pageSize={this.state.pageSize}/>
                <br/><br/>
                <div className="ui vertically divided grid">{rows}</div>
            </div>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            this.collectData();
        }, 0);
    }

    collectData() {
        let git = this.props.git;
        this.commits = git.getCommits();
        let commitsCount = git.getCommitsCount();
        this.setState(() => {
            this.state.loading = false;
            this.state.totalPage = Math.ceil(commitsCount / this.state.pageSize);
            return this.state;
        });
    }

    showLoader() {
        return (
            <div className="ui">
                <div className="ui inverted active dimmer">
                    <div className="ui massive text loader">Please wait. Collecting data...</div>
                </div>
            </div>
        );
    }

    showError(header, messages) {
        let msg = messages.map((message) => <p>{message}</p>);
        return (
            <div>
                <div className="ui negative message">
                    <div className="header">{header}</div>
                    {msg}
                </div>
            </div>
        )
    }
}
