import React from 'react';

import SelectListItem from './select-list-item.jsx';

const SelectList = props => {
    if (props.options.length === 0) return null;
    let items = props.options.map(option => {
        let display, key, idx, selected = false;
        if (props.stringOption) {
            display = option;
            key = option;
            idx = props.selectedOptions.findIndex(opt => {
                if (opt === option) return true;
            });
        } else {
            display = option[props.optionAttr];
            key = option[props.valueAttr];
            idx = props.selectedOptions.findIndex(opt => {
                if (opt[props.valueAttr] === key) return true;
            });
        }
        if (idx !== -1) selected = true;
        return <SelectListItem
                    key={key}
                    selected={selected}
                    option={option}
                    display={display}
                    onClick={props.onSelect}/>;
    });
    return <div className="menu transition visible" tabIndex="-1">{items}</div>;
}

export default SelectList;

SelectList.defaultProps = {
    stringOption: false
}

SelectList.propsType = {
    options: React.PropTypes.array.isRequired,
    selectedOptions: React.PropTypes.array.isRequired,
    stringOption: React.PropTypes.bool,
    valueAttr: React.PropTypes.string,
    optionAttr: React.PropTypes.string,
    onSelect: React.PropTypes.func.isRequired
}
