import React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import AppConst from 'constants/app.js';
import { Button, Select } from 'modules/common';
import { DiffTypeAction, OutputAction, TargetAction } from 'modules/modal/actions';

const DIFF_TYPES = [
	{ value: 1, text: 'Line by line' },
	{ value: 2, text: 'Side by side' }
];

class ModalMainForm extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.selectTarget = this.selectTarget.bind(this);
		this.selectDiffType = this.selectDiffType.bind(this);
		this.selectOutput = this.selectOutput.bind(this);
		this.updateOutput = this.updateOutput.bind(this);
	}

	render() {
		let { data, files, target, diffType, output } = this.props;
		let { branches, currentBranch } = data;
		let lis = files.data.map((file, i) => {
			return <li key={i} className="item">{file.filePath}</li>;
		});
		return (
			<form className="ui form">
				<div className="field">
					<label>Current branch: {currentBranch}</label>
				</div>
                <div className="two fields">
                	<div className="field">
	                    <label>Target branch:</label>
	                    <Select
	                    	options={branches}
	                    	selectedOptions={target}
	                    	stringOption={true}
	                    	placeHolder="Pick target branch"
	                    	onChange={this.selectTarget}/>
					</div>
					<div className="field">
	                    <label>Diff type:</label>
	                    <Select
	                    	options={DIFF_TYPES}
	                    	selectedOptions={diffType}
	                    	placeHolder="Select diff type"
	                    	onChange={this.selectDiffType}/>
					</div>
                </div>
                <div className="field">
                	<label>Select output directory:</label>
					<div className="ui left action input">
						<Button buttonClass="teal" iconClass="folder open" label="Browse" onClick={this.selectOutput}/>
						<div className="ui input">
							<input className="glv-input-disabled" type="text" value={output} disabled/>
						</div>
					</div>
                </div>
                <div className="field">
                    <label>List files to diff:</label>
                    <ol className="glv-modal-files">{lis}</ol>
                </div>
            </form>
		)
	}

	selectTarget(target) {
		this.props.updateTarget(target);
	}

	selectDiffType(diffType) {
		this.props.updateDiffType(diffType);
	}

	selectOutput(e) {
		e.preventDefault();
		ipcRenderer.send(AppConst.CHANNEL_SHOW_DIR_DIALOG, AppConst.CHANNEL_SELECTED_DIR);
        ipcRenderer.once(AppConst.CHANNEL_SELECTED_DIR, this.updateOutput);
	}

	updateOutput(e, dirs) {
		if (!dirs) return;
		this.props.updateOutput(dirs[0]);
	} 

}

const mapStateToProps = state => {
	return {
		data: state.data,
		target: state.target,
		diffType: state.diffType,
		files: state.files,
		output: state.output
	};
}
const mapDispatchToProps = dispatch => {
	return {
		updateTarget: target => dispatch(TargetAction.updateTarget(target)),
		updateDiffType: diffType => dispatch(DiffTypeAction.updateDiffType(diffType)),
		updateOutput: output => dispatch(OutputAction.updateOutput(output))
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalMainForm);