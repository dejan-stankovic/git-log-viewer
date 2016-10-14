import React from 'react';
import * as AppConst from '../../appconst.js';
import Git from '../../utils/git.js';
import Common from '../../utils/common.js';

import Pager from '../shared/pager.jsx';
import Select from '../shared/select.jsx';
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

        // Calculate total page
        this.state.totalPage = Math.ceil(this.props.git.commitsCount / this.state.pageSize);

        this.changePage = this.changePage.bind(this);
        this.getData = this.getData.bind(this);
    }

    render() {
        let rows = null;
        if (this.state.loading) {
            rows = <div className="ui active centered text inline loader">Getting Commit Logs</div>;
        } else {
            if (this.commits === null) {
                return this.showError('Empty data', ['Could not read commit log from Git directory.', 'Please try again.']);
            }
            rows = this.commits.map((commit) => <Row key={commit.hash} commit={commit} git={this.props.git}/>);
        }

        let options = [
            {text: 'Test 1', value: 'test1@example.com', selected: false},
            {text: 'Test 2', value: 'test2@example.com', selected: false},
            {text: 'Test 3', value: 'test3@example.com', selected: true},
            {text: 'Test 4', value: 'test4@example.com', selected: false},
            {text: 'Test 5', value: 'test5@example.com', selected: false}
        ];

        return (
            <div>
                <Select options={options}/>
                <Pager currentPage={this.state.currentPage} totalPage={this.state.totalPage} pageSize={this.state.pageSize} onChange={this.changePage}/>
                <br/><br/>
                <div className="ui vertically divided grid">{rows}</div>
            </div>
        );
    }

    componentDidMount() {
        this.getData();
    }

    changePage(page) {
        this.state.currentPage = page;
        this.setState(this.state);
        this.getData();
    }

    getData() {
        this.state.loading = true;
        this.setState(this.state);

        Common.executeAsync(() => {
            this.commits = this.props.git.getCommits(this.state.currentPage);
            this.state.loading = false;
            this.setState(this.state);
        });
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
