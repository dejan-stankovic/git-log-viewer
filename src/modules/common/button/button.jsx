import React from 'react';

export default (props) => {
	let icon = null;
	if (props.iconClass) {
		icon = <i className={'icon ' + props.iconClass}></i>;
	}
	return (
		<button className={'ui button ' + props.buttonClass} onClick={props.onClick}>
            {icon} {props.label}
        </button>
	)
}