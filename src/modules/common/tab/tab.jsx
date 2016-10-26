import React from 'react';

const Tab = (props) => {
	if (!props.data) return null;
	let buttons = [], contents = [];
	for (let i = 0; i < props.data.length; i++) {
		let tab = props.data[i];
		let className = props.active === i ? 'active' : '';
		buttons.push(<a key={'button' + i} className={'item ' + className} onClick={() => props.changeTab(i)}>{tab.name}</a>);
		contents.push(<div key={'content' + i} className={'ui bottom attached tab segment ' + className}>{tab.component}</div>);
	}
	return (
        <div className="glv-margin-top">
            <div className="ui top attached tabular menu">{buttons}</div>
            {contents}
        </div>
    );
}

Tab.defaultProps = {
	active: 0
}

export default Tab;