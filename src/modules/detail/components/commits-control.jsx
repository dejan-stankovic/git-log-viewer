import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'modules/common';
import { FilterAction, SelectionAction } from 'modules/detail/actions';

class CommitsControl extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
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
			</div>
		);
	}
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
