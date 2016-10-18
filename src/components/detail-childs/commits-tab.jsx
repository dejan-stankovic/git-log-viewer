import React from 'react';
import * as AppConst from '../../appconst.js';
import Git from '../../utils/git.js';
import Common from '../../utils/common.js';

import Pager from '../shared/pager.jsx';
import Select from '../shared/select.jsx';
import Filter from './filter.jsx';
import Row from './row.jsx';

export default class CommitsTab extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            currentBranch: props.repository.currentBranch,
            loading: true,
            currentPage: 1,
            pageSize: AppConst.PAGER_DEFAULT_SIZE,
            totalPage: Math.ceil(props.repository.commitsCount / AppConst.PAGER_DEFAULT_SIZE)
        };
        this.filter = {
            users: [],
            message: '',
            fromDate: '',
            toDate: ''
        };

        this.changePage = this.changePage.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
        this.getData = this.getData.bind(this);
        this.search = this.search.bind(this);
    }

    render() {
        let rows = null;
        if (this.state.loading) {
            rows = <div className="ui active centered text inline loader">Getting Commit Logs</div>;
        } else {
            if (this.commits === null) {
                return this.showError('Empty data', 'Could not read commit log from Git directory. Please try again.');
            }
            rows = this.commits.map((commit) => <Row key={commit.hash} commit={commit}/>);
        }

        return (
            <div>
                <Filter users={this.props.repository.users} search={this.search}/>
                <Pager
                    currentPage={this.state.currentPage}
                    totalPage={this.state.totalPage}
                    onPageChanged={this.changePage}
                    onPageSizeChanged={this.changePageSize}
                    pageSizes={AppConst.PAGER_SIZE_AVAIABLE}
                    pageSize={this.state.pageSize}/>
                <div className="ui vertically divided grid">{rows}</div>
            </div>
        );
    }

    componentDidMount() {
        this.getData();
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.currentBranch !== nextProps.repository.currentBranch) {
            this.state.currentBranch = nextProps.repository.currentBranch;
            this.getData();
        }
    }

    changePage(page) {
        this.state.currentPage = page;
        this.getData();
    }

    changePageSize(pageSize) {
        this.state.pageSize = pageSize;
        this.getData();
    }

    getData() {
        this.setState({ loading: true });
        let currentBranch = this.props.repository.currentBranch;

        Git.getCommitsCount(currentBranch, this.filter.users, this.filter.message, this.filter.fromDate, this.filter.toDate).then(count => {
            this.state.totalPage = Math.ceil(count / this.state.pageSize);
            if (this.state.currentPage > this.state.totalPage) {
                this.state.currentPage = this.state.totalPage;
            }
            return Git.getCommits(this.state.currentPage, this.state.pageSize, currentBranch,
                this.filter.users, this.filter.message, this.filter.fromDate, this.filter.toDate);
        }).then(commits => {
            this.commits = commits;
            this.setState({ loading: false });
        });
    }

    search(users, message, fromDate, toDate) {
        this.filter.users = users;
        this.filter.message = message;
        this.filter.fromDate = fromDate;
        this.filter.toDate = toDate;
        this.getData();
    }

    showError(header, message) {
        return (
            <div>
                <div className="ui negative message">
                    <div className="header">{header}</div>
                    <p>{message}</p>
                </div>
            </div>
        );
    }
}
