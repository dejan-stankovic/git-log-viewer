import React from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
import * as AppConst from '../appconst.js';
import Git from '../utils/git.js';
import Common from '../utils/common.js';

import Detail from './detail.jsx';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = { loading: false };
        this.chooseDir = this.chooseDir.bind(this);
        this.collectData = this.collectData.bind(this);
    }

    render() {
        let loader = null;
        if (this.state.loading) {
            loader = (
                <div>
                    <div className="ui active centered inline small loader"></div>
                    <p className="glv-centered">Initializing data. Please wait...</p>
                </div>
            );
        }
        return (
            <div>
                <div className="ui header centered">
                    <h1 className="ui header icon glv-header">
                        <i className="git square icon"/>
                        Git Log Viewer
                    </h1>
                    <p>Simple Git Log Viewer built with Electron, ReactJS & Semantic UI</p>
                    <button className="ui large blue button" onClick={this.chooseDir}>
                        <i className="folder open outline icon"></i> Choose your git directory
                    </button>
                </div>
                {loader}
            </div>
        );
    }

    chooseDir() {
        ipcRenderer.send(AppConst.CHANNEL_SHOW_DIR_DIALOG, AppConst.CHANNEL_SELECTED_DIR);
        ipcRenderer.once(AppConst.CHANNEL_SELECTED_DIR, this.collectData);
    }

    collectData(e, path) {
        this.setState({ loading: true });
        Common.executeAsync(() => {
            let git = new Git(path[0]);
            if (!git.isValid()) {
                Common.showErrorBox('Invalid directory', 'Your directory is not a Git directory.\nPlease try again.');
                this.setState({ loading: false });
                return;
            }
            let branches = git.getBranches();
            let users = git.getUsers();
            let commitsCount = git.getCommitsCount();
            Common.renderPage(<Detail git={git} branches={branches} users={users} commitsCount={commitsCount}/>);
        });
    }
}
