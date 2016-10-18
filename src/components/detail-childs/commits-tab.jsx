import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
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
            currentBranch: props.repository.currentBranch,
            loading: true,
            currentPage: 1,
            pageSize: AppConst.PAGER_DEFAULT_SIZE,
            totalPage: Math.ceil(props.repository.commitsCount / AppConst.PAGER_DEFAULT_SIZE)
        };

        this.changePage = this.changePage.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
        this.getData = this.getData.bind(this);
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
                <Pager
                    currentPage={this.state.currentPage}
                    totalPage={this.state.totalPage}
                    onPageChanged={this.changePage}
                    onPageSizeChanged={this.changePageSize}
                    pageSizes={AppConst.PAGER_SIZE_AVAIABLE}/>
                <br/><br/>
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
        let repository = this.props.repository;
        this.state.loading = true;
        this.state.totalPage = Math.ceil(repository.commitsCount / this.state.pageSize);
        if (this.state.currentPage > this.state.totalPage) {
            this.state.currentPage = this.state.totalPage;
        }
        this.setState(this.state);

        Git.getCommits(this.state.currentPage, this.state.pageSize, repository.currentBranch).then(commits => {
            this.commits = commits;
            this.setState({ loading: false });
        });
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
