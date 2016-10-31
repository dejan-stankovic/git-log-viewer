import React from 'react';
import { connect } from 'react-redux';
import { remote, ipcRenderer } from 'electron';
import AppConst from 'constants/app.js';
import Git from 'utils/git.js';
import ModalMain from 'modules/modal/components/modal-main.jsx';
import ModalButtons from 'modules/modal/components/modal-buttons.jsx';

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.closeModal = this.closeModal.bind(this);
		this.process = this.process.bind(this);
	}

	render() {
		let { ready } = this.props;
		return (
			<div id="modal" className="glv-modal">
				<ModalMain/>
				<ModalButtons cancel={this.closeModal} disabled={!ready} process={this.process}/>
			</div>
		)
	}

	closeModal() {
		remote.getCurrentWindow().destroy();
	}

	process() {
		let { data, files, target, output } = this.props;
		for (let file of files.data) {
			Git.diff(file.filePath, data.currentBranch, target)
				.then(output => {
					ipcRenderer.send(AppConst.CHANNEL_EXPORT_HTML_DIFF, output);
				})
				.catch(err => {
					throw err;
				});
		}
	}
}

const mapStateToProps = state => {
	return {
		data: state.data,
		files: state.files,
		target: state.target,
		output: state.output,
		ready: state.ready
	};
}
const mapDispatchToProps = dispatch => {
	return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Modal);