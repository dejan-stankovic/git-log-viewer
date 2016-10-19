import React from 'react';
import ReactDOM from 'react-dom';
import Common from '../utils/common.js';
import Git from '../utils/git.js';
import TabModel from '../models/tab.js';

import BackButton from './shared/back-home-btn.jsx';
import Tab from './shared/tab.jsx';
import Select from './shared/select.jsx';
import CommitsTab from './detail-childs/commits-tab.jsx';
import InformationTab from './detail-childs/information-tab.jsx';

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { repository: props.repository };
        this.showLoader = this.showLoader.bind(this);
        this.hideLoader = this.hideLoader.bind(this);
        this.changeBranch = this.changeBranch.bind(this);
        this.fetchAll = this.fetchAll.bind(this);
    }

    render() {
        let state = this.state;
        let tabs = [];
        tabs.push(new TabModel('Commits', <CommitsTab repository={state.repository}/>));
        tabs.push(new TabModel('Information', <InformationTab repository={state.repository}/>));
        return (
            <div>
                <BackButton/>
                <button className="ui button" onClick={this.fetchAll}>Fetch all</button>
                <Select
                    options={state.repository.branches}
                    stringOption="true"
                    selectedOptions={[state.repository.currentBranch]}
                    button="true"
                    onUpdate={this.changeBranch}/>
                <br/><br/>
                <Tab data={tabs} ref="tab"/>
                <div className="glv-hidden" ref="loader">
                    <div className="ui active centered inline large loader"></div>
                    <h4 className="glv-centered">Getting data for new branch. Please wait...</h4>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.tab = ReactDOM.findDOMNode(this.refs.tab);
        this.loader = ReactDOM.findDOMNode(this.refs.loader);
    }

    showLoader() {
        this.tab.className = 'glv-hidden';
        this.loader.className = '';
    }

    hideLoader() {
        this.tab.className = '';
        this.loader.className = 'glv-hidden';
    }

    changeBranch(branches) {
        this.showLoader();
        let repository = this.state.repository;
        repository.currentBranch = branches[0];
        let promises = [];
        promises.push(Git.getUsers(repository.currentBranch));
        promises.push(Git.getCommitsCount(repository.currentBranch));
        Promise.all(promises).then(values => {
            repository.users = values[0];
            repository.commitsCount = values[1];
            this.hideLoader();
            this.setState({ repository: repository });
        }).catch(err => {
            Common.showErrorBox('Error', 'Could not get information of new branch.');
            this.hideLoader();
        });
    }

    fetchAll() {
        this.showLoader();
        Git.fetchAll().then(() => {
            this.changeBranch([this.state.repository.currentBranch]);
        }).catch(stderr => {
            Common.showErrorBox('Fetch Error', stderr);
            this.hideLoader();
        });
    }
}
