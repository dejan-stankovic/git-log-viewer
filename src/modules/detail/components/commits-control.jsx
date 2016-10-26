import React from 'react';
import { connect } from 'react-redux';
import { Button, Select, SelectType } from 'modules/common';
import { FilterAction, SelectionAction } from 'modules/detail/actions';

const actions = [
	{ text: "Export selected commits", value: 1 },
	{ text: "Create Merge diff report from selected", value: 2 }
];

class CommitsControl extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.renderAction = this.renderAction.bind(this);
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

	doAction() {}
}

const mapStateToProps = state => {
	return {
		filter: state.filter,
		selection: state.selection
	};
}
const mapDispatchToProps = dispatch => {
	return {
		toggleFilter: () => dispatch(FilterAction.toggleFilter()),
		toggleSelectAll: () => dispatch(SelectionAction.toggleSelectAll())
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(CommitsControl);
