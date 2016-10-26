import React from 'react';

import { Select } from 'modules/common/select/select.jsx';

const Pager = (props) => {
    let current = parseInt(props.current);
    let total = parseInt(props.total);
    let key = 0;
    if (current > total || current < 1 || total < 1) return null;
    let getItem = (text, isDisabled, isActive, target) => {
        let className = 'item ';
        if (isDisabled) className += 'disabled';
        else if (isActive) className += 'active';
        if (isDisabled || isActive) {
            return <div key={key++} className={className}>{text}</div>;
        } else {
            return <a key={key++} className={className} onClick={() => props.changePage(target)}>{text}</a>;
        }
    }
    let changePageSize = (selected) => props.changePageSize(selected[0]);

    let before, after;

    if (current === 1) {
        before = [getItem(<i className="left chevron icon"></i>, true, false)];
    } else {
        before = [getItem(<i className="left chevron icon"></i>, false, false, current - 1)];
    }
    if (current > 4) {
        before = [...before, ...[
            getItem(1, false, false, 1),
            getItem('...', true, false),
            getItem(current - 1, false, false, current - 1)
        ]];
    } else {
        for (let i = 1; i < current; i++) {
            before.push(getItem(i, false, false, i));
        }
    }

    after = [getItem(current, false, true)];
    if (total - current > 3) {
        after = [...after, ...[
            getItem(current + 1, false, false, current + 1),
            getItem('...', true, false),
            getItem(total, false, false, total)
        ]];
    } else {
        for (let i = current + 1; i <= total; i++) {
            after.push(getItem(i, false, false, i));
        }
    }
    if (current === total) {
        after.push(getItem(<i className="right chevron icon"></i>, true, false));
    } else {
        after.push(getItem(<i className="right chevron icon"></i>, false, false, current + 1));
    }

    return (
        <div className="ui grid">
    		<div className="ten wide column"><div className="ui pagination menu">{[...before, ...after]}</div></div>
    		<div className="six wide right aligned column">
                <label>
                    Show&nbsp;&nbsp;
					<Select
						options={props.sizes}
						stringOption={true}
						selectedOptions={[props.size]}
						onChange={changePageSize}/>
                    &nbsp;&nbsp;items
                </label>
            </div>
    	</div>
    );
}

export default Pager;

Pager.propsType = {
	current: React.PropTypes.number.isRequired,
	total: React.PropTypes.number.isRequired,
	size: React.PropTypes.number.isRequired,
	sizes: React.PropTypes.array.isRequired,
	changePage: React.PropTypes.func.isRequired,
	changePageSize: React.PropTypes.func.isRequired
}