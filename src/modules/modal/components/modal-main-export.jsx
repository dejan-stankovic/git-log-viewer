import React from 'react';
import { connect } from 'react-redux';

class ModalMainExport extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		let { progress, current, log } = this.props.exporting;
		let style = {
			transitionDuration: '300ms',
			width: progress + '%'
		}
		return (
			<div>
				<div className="ui progress success">
					<div className="bar" style={style}>
						<div className="progress">{progress + '%'}</div>
					</div>
					<div className="label">{current}</div>
				</div>
				<div className="ui form">
					<div className="field">
						<textarea className="glv-modal-log" value={log} readOnly></textarea>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		exporting: state.exporting
	};
}
const mapDispatchToProps = dispatch => {
	return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalMainExport);