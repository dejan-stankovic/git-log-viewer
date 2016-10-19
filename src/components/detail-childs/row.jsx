import React from 'react';
import Git from '../../utils/git.js';

export default class Row extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            loading: false,
            expanded: false
        };
    }

    render() {
        if (this.props.commit === null) {
            return null;
        }
        let commit = this.props.commit;
        let loadingClass = this.state.loading ? ' loading' : '';
        let buttonClass = '';
        if (this.state.loading) {
            buttonClass += ' loading';
        }
        if (!this.state.expanded) {
            buttonClass += ' violet';
        }
        let detail = null;
        if (this.state.expanded && commit.files !== null) {
            let lis = commit.files.map((file, i) => <li key={i}>{file.filePath}</li>);
            detail = (
                <div className="ui grid glv-grid">
                    <div className="column">
                        <ul>
                            <li><strong>Hash:</strong> {commit.hash}</li>
                            <li><strong>Files:</strong>
                                <ul>{lis}</ul>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        }
        return (
            <div className="row glv-row">
                <div className="column glv-column">
                    <div className="ui two column grid glv-grid">
                        <div className="twelve wide column glv-column">
                            <div className="ui label">
                                <i className="user icon"></i> {commit.username}
                            </div>
                            <div className="ui label">
                                <i className="mail icon"></i> {commit.email}
                            </div>
                            <div className="ui label">
                                <i className="wait icon"></i> {commit.date}
                            </div>
                        </div>
                        <div className="right aligned four wide column glv-column">
                            <div className="ui checkbox">
                                <input type="checkbox" name="commit" onClick={() => this.props.toggleSelect(commit)}/>
                                <label></label>
                            </div>
                        </div>
                    </div>
                    <div className="ui two column grid glv-grid">
                        <div className="twelve wide column glv-column">
                            <p className="glv-commit-msg">{commit.message}</p>
                        </div>
                        <div className="right aligned four wide column glv-column glv-column-btn">
                            <button className={'tiny ui button' + buttonClass} onClick={() => {this.toggle()}}>
                                {this.state.expanded ? 'Less' : 'More'}
                            </button>
                        </div>
                    </div>
                    {detail}
                </div>
            </div>
        );
    }

    toggle() {
        let state = this.state;
        let commit = this.props.commit;
        if (state.loading) {
            return;
        }
        if (state.expanded) {
            this.setState({ expanded: false, loading: false });
            return;
        }
        if (commit.files !== null) {
            this.setState({ expanded: true });
            return;
        }

        this.setState({ loading: true });
        Git.getFilesByCommitHash(commit.hash).then(files => {
            commit.files = files;
            this.setState({ loading: false, expanded: true });
        });
    }
}
