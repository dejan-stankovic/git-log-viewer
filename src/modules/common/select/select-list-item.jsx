import React from 'react';

const SelectListItem = props => {
	let className = 'item ';
	if (props.selected) className += 'selected';
	let onClick = e => {
		e.stopPropagation();
		props.onClick(props.option, props.selected);
	}
	return <div className={className} onClick={onClick}>{props.display}</div>;
}

export default SelectListItem;

SelectListItem.defaultProps = {
	selected: false
}

SelectListItem.propsType = {
	option: React.PropTypes.any.isRequired,
	display: React.PropTypes.any.isRequired,
	selected: React.PropTypes.bool
}