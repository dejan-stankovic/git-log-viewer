import path from 'path';
import React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import AppConst from 'constants/app.js';
import Git from 'utils/git.js';
import { Button, Select, SelectType } from 'modules/common';
import { ControlAction, FilterAction, SelectionAction } from 'modules/detail/actions';

const actions = [
	{ text: "Export selected commits", value: 1 },
	{ text: "Create Merge diff report from selected", value: 2 }
];

class CommitsControl extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.renderAction = this.renderAction.bind(this);
		this.renderLoader = this.renderLoader.bind(this);
		this.doAction = this.doAction.bind(this);
	}

	render() {
		let { filter, selection, toggleFilter, toggleSelectAll } = this.props;
		let filterBtn = filter.active ? 'Hide filter' : 'Show filter';
		let selectBtn = selection.isAll ? 'Deselect All' : 'Select All';
		return (
			<div className="glv-margin-top">
				<Button 
					buttonClass="basic"
					iconClass="filter left"
					label={filterBtn}
					onClick={toggleFilter}/>
				<Button
					buttonClass="basic"
					label={selectBtn}
					onClick={toggleSelectAll}/>
					{this.renderAction()}
					{this.renderLoader()}
			</div>
		);
	}

	renderAction() {
		let { selection } = this.props;
		if (selection.indexes.length === 0) return null;
		return <Select
					type={SelectType.BUTTON}
					options={actions}
					placeHolder="Choose an action"
					onChange={this.doAction}/>
	}

	renderLoader() {
		if (!this.props.control.loading) return null;
		return <div className="ui active inline small loader"></div>
	}

	doAction(opts) {
		let type = opts[0].value;
		let { commits, control, repository, selection, startAction, stopAction } = this.props;
		let selectedCommits = [];
		for (let i = 0; i < commits.data.length; i++) {
			if (selection.indexes.indexOf(i) > -1)
				selectedCommits.push(commits.data[i]);
		}
		if (type === 1) {
			ipcRenderer.send(AppConst.CHANNEL_COMMITS_REPORT, selectedCommits);
		} else if (type === 2) {
			let data = {
				gitdir: process.cwd(),
				project: path.basename(repository.url, path.extname(repository.url)),
				branches: repository.branches,
				currentBranch: repository.currentBranch,
				commits: selectedCommits
			}
			ipcRenderer.send(AppConst.CHANNEL_SHOW_MODAL, data);
		}
	}
}

const mapStateToProps = state => {
	return {
		commits: state.commits,
		control: state.control,
		filter: state.filter,
		repository: state.repository,
		selection: state.selection
	};
}
const mapDispatchToProps = dispatch => {
	return {
		startAction: () => dispatch(ControlAction.startAction()),
		stopAction: () => dispatch(ControlAction.stopAction()),
		toggleFilter: () => dispatch(FilterAction.toggleFilter()),
		toggleSelectAll: () => dispatch(SelectionAction.toggleSelectAll())
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(CommitsControl);
