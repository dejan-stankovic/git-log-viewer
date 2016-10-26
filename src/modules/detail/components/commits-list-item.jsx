import React from 'react';
import Git from 'utils/git.js';

export default class CommitsItem extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            loading: false,
            expanded: false,
            files: null
        };
    }

    render() {
        let { commit, checked, onChange } = this.props;
        let { loading, expanded, files } = this.state;
        if (commit === null) return null;
        let loadingClass = loading ? ' loading' : '';
        let detail = null;
        if (expanded && files) {
            let lis = files.map((file, i) => <li key={i}>{file.filePath}</li>);
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
                                <input type="checkbox" checked={checked} onChange={onChange}/>
                                <label></label>
                            </div>
                        </div>
                    </div>
                    <div className="ui two column grid glv-grid">
                        <div className="twelve wide column glv-column">
                            <p className="glv-commit-msg">{commit.message}</p>
                        </div>
                        <div className="right aligned four wide column glv-column glv-column-btn">
                            <button className={'tiny ui button' + loadingClass} onClick={() => {this.toggle()}}>
                                {expanded ? 'Less' : 'More'}
                            </button>
                        </div>
                    </div>
                    {detail}
                </div>
            </div>
        );
    }

    toggle() {
        let { loading, expanded, files } = this.state;
        if (loading) return;
        if (expanded) return this.setState({ expanded: false, loading: false });
        if (files !== null) return this.setState({ expanded: true });

        this.setState({ loading: true });
        Git.getFilesByCommitHash(this.props.commit.hash)
            .then(files => {
                this.setState({ loading: false, expanded: true, files: files });
            }).catch(err => {
                this.setState({ loading: false });
            });
    }
}
