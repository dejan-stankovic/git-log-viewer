import React from 'react';
import { remote } from 'electron';
import { Button } from 'modules/common';

export default props => {
	const closeModal = () => {
		remote.getCurrentWindow().destroy();
	}
	return (
		<div className="glv-modal-bottom">
			<Button
				buttonClass="black deny"
				label="Cancel"
				onClick={closeModal}/>
			<Button
				buttonClass="positive right labeled icon"
				disabled={props.disabled}
				iconClass="checkmark"
				label="Let's do it"
				onClick={props.process}/>
        </div>
	)
}