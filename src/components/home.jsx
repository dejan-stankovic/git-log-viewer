import React from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
import * as AppConst from '../appconst.js';
import Git from '../utils/git.js';
import Common from '../utils/common.js';
import Repository from '../models/repo.js';

import Detail from './detail.jsx';

export default class Home extends React.Component {
    constructor() {
        super();
        this.chooseDir = this.chooseDir.bind(this);
        this.collectData = this.collectData.bind(this);
    }

    render() {
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
                <div className="glv-hidden" ref="loader">
                    <div className="ui active centered inline small loader"></div>
                    <p className="glv-centered">Initializing data. Please wait...</p>
                </div>
            </div>
        );
    }

    chooseDir() {
        ipcRenderer.send(AppConst.CHANNEL_SHOW_DIR_DIALOG, AppConst.CHANNEL_SELECTED_DIR);
        ipcRenderer.once(AppConst.CHANNEL_SELECTED_DIR, this.collectData);
    }

    collectData(e, path) {
        this.showLoader();
        Common.executeAsync(() => {
            if (!Common.isValidGitDirectory(path[0])) {
                Common.showErrorBox('Invalid directory', 'Your directory is not a Git directory.\nPlease try again.');
                this.hideLoader();
                return;
            }
            let repository = new Repository();
            repository.collectData();
            Common.renderPage(<Detail repository={repository}/>);
        });
    }

    showLoader() {
        let loader = ReactDOM.findDOMNode(this.refs.loader);
        loader.className = '';
    }

    hideLoader() {
        let loader = ReactDOM.findDOMNode(this.refs.loader);
        loader.className = 'glv-hidden';
    }
}
