import React from 'react';
import { connect } from 'react-redux';
import Git from 'utils/git.js';
import { Loader } from 'modules/common';
import { FilesAction } from 'modules/modal/actions';
import ModalMainForm from 'modules/modal/components/modal-main-form.jsx';
import ModalMainExport from 'modules/modal/components/modal-main-export.jsx';

class ModalMain extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.files = [];

		this.renderLoader = this.renderLoader.bind(this);
		this.renderContent = this.renderContent.bind(this);
		this.getFilesOfCommit = this.getFilesOfCommit.bind(this);
	}

	render() {
		return (
			<div className="glv-modal-top">
				{this.renderLoader()}
				{this.renderContent()}
			</div>
		)
	}

	componentDidMount() {
		this.getFilesOfCommit(0);
	}

	renderLoader() {
		let { loading, progress } = this.props.files;
		if (!loading) return null;
		return <Loader
					isFullscreen={true}
					className="inverted"
					text={`Loadng ${progress}%...`}/>;
	}

	renderContent() {
		if (this.props.files.loading) return null;
		if (this.props.exporting.status) return <ModalMainExport/>;
		return <ModalMainForm/>
	}

	getFilesOfCommit(index) {
		let { updateFiles, setProgress } = this.props;
		let { commits } = this.props.data;
		if (index >= commits.length) {
			return updateFiles({
				loading: false,
				progress: 100,
				data: this.files
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
				setProgress(Math.ceil((index + 1) / commits.length * 100));
				this.getFilesOfCommit(index + 1);
			})
			.catch(err => {
				console.error(err);
			});
	}
}

const mapStateToProps = state => {
	return {
		data: state.data,
		diffType: state.diffType,
		files: state.files,
		target: state.target,
		exporting: state.exporting
	};
}
const mapDispatchToProps = dispatch => {
	return {
		updateFiles: files => dispatch(FilesAction.updateFiles(files)),
		setProgress: progress => dispatch(FilesAction.setProgress(progress))
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalMain);