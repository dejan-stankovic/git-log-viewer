import React from 'react';
import { remote, ipcRenderer } from 'electron';
import AppConst from 'constants/app.js';
import ModalMain from 'modules/modal/components/modal-main.jsx';
import ModalButtons from 'modules/modal/components/modal-buttons.jsx';

export default class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			ready: false,
			target: []
		}
		this.selectBranch = this.selectBranch.bind(this);
		this.setFiles = this.setFiles.bind(this);
		this.process = this.process.bind(this);
	}

	render() {
		let { ready, target } = this.state;
		return (
			<div id="modal" className="glv-modal">
		        <ModalMain
		        	data={this.props.data}
		        	target={target}
		        	selectBranch={this.selectBranch}
		        	onLoaded={this.setFiles}/>
		        <ModalButtons disabled={!ready} cancel={this.closeModal} process={this.process}/>
		    </div>
		)
	}

	closeModal() {
		remote.getCurrentWindow().destroy();
	}

	selectBranch(branches) {
		let state = { target: branches };
		if (branches[0] !== this.props.data.currentBranch) state.ready = true;
		else state.ready = false;
		this.setState(state);
	}

	setFiles(files) {
		this.files = files;
	}

	process() {
		let data = {
			files: this.files,
			project: this.props.data.project,
			currentBranch: this.props.data.currentBranch,
			targetBranch: this.state.target[0]
		}
		ipcRenderer.send(AppConst.CHANNEL_MERGE_DIFF_REPORT, data);
		this.closeModal();
	}
}