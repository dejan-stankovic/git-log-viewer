import React from 'react';
import Git from 'utils/git.js';
import { Loader, Select } from 'modules/common';

export default class ModalMain extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			loading: true,
			progress: 0
		}
		this.files = [];
		this.getFilesOfCommit = this.getFilesOfCommit.bind(this);
	}

	render() {
		let loader = null, form = null;
		let { loading, progress } = this.state;
		let { branches } = this.props.data;
		let { target, selectBranch } = this.props;
		if (loading) {
			loader = <Loader isFullscreen={true} className="inverted" text={`Loadng ${progress}%...`}/>;
		} else {
			let lis = this.files.map((file, i) => {
				return <li key={i} className="item">{file.filePath}</li>;
			})
			form = (
				<form className="ui form">
	                <div className="field">
	                    <label>Target Branch:</label>
	                    <Select
	                    	options={branches}
	                    	selectedOptions={target}
	                    	stringOption={true}
	                    	placeHolder="Pick target branch"
	                    	onChange={selectBranch}/>
	                </div>
	                <div className="field">
	                    <label>List files to diff:</label>
	                    <ol className="glv-modal-files">{lis}</ol>
	                </div>
	            </form>
			)
		}
		return (
			<div className="glv-modal-top">
				{loader}
				{form}
			</div>
		)
	}

	componentDidMount() {
		this.getFilesOfCommit(0);
	}

	getFilesOfCommit(index) {
		let { commits } = this.props.data;
		if (index >= commits.length) {
			return this.setState({
				loading: false,
				progress: 100
			});
		}
		Git.getFilesByCommitHash(commits[index].hash)
			.then(results => {
				for (let file of results) {
					let f = this.files.find(tmp => {
						return tmp.filePath === file.filePath;
					});
					if (!f) this.files.push(file);
				}
				this.setState({ progress: Math.ceil((index + 1) / commits.length * 100) });
				this.getFilesOfCommit(index + 1);
			})
			.catch(err => {
				console.error(err);
			});
	}
}