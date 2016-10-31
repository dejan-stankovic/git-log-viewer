import React from 'react';
import { Button } from 'modules/common';

export default props => {
	return (
		<div className="glv-modal-bottom">
			<Button
				buttonClass="black deny"
				label="Cancel"
				onClick={props.cancel}/>
			<Button
				buttonClass="positive right labeled icon"
				disabled={props.disabled}
				iconClass="checkmark"
				label="Let's do it"
				onClick={props.process}/>
        </div>
	)
}