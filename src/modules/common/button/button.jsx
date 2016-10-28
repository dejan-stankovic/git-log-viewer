import React from 'react';

export default (props) => {
	let className = 'ui button ', icon = null;
	let { buttonClass, iconClass, disabled, label, onClick } = props;
	if (iconClass) {
		icon = <i className={'icon ' + iconClass}></i>;
	}
	if (disabled) className += 'disabled ';
	className += buttonClass;
	return (
		<button className={className} onClick={onClick}>
            {icon} {label}
        </button>
	)
}