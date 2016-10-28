import React from 'react';
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
	}

	render() {
		let { ready, target } = this.state;
		return (
			<div id="modal" className="glv-modal">
		        <ModalMain data={this.props.data} target={target} selectBranch={this.selectBranch}/>
		        <ModalButtons disabled={!ready} process={() => {}}/>
		    </div>
		)
	}

	selectBranch(branches) {
		let state = { target: branches };
		if (branches[0] !== this.props.data.currentBranch) state.ready = true;
		else state.ready = false;
		this.setState(state);
	}
}