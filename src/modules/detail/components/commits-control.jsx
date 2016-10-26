import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'modules/common';
import { FilterAction } from 'modules/detail/actions';

class CommitsControl extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		let { filter } = this.props;
		let filterBtn = filter.active ? 'Hide filter' : 'Show filter';
		return (
			<div className="glv-margin-top">
				<Button buttonClass="basic" iconClass="filter left" label={filterBtn} onClick={this.props.toggleFilter}/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		filter: state.filter
	};
}
const mapDispatchToProps = dispatch => {
	return {
		toggleFilter: () => dispatch(FilterAction.toggleFilter())
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(CommitsControl);
