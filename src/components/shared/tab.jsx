import React from 'react';

export default class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        if (this.props.hasOwnProperty('active')) {
            this.state = { active: this.props.active };
        } else {
            this.state = { active: 0 }; // Active first tab by default
        }
    }

    render() {
        if (!this.props.data) {
            return null;
        }
        let buttons = [];
        let contents = [];
        for (let i = 0; i < this.props.data.length; i++) {
            let tab = this.props.data[i];
            let activeClass = (i == this.state.active) ? ' active' : '';
            buttons.push(<a key={i} className={'item' + activeClass} onClick={() => this.changeTab(i)}>{tab.name}</a>);
            contents.push(
                <div key={i} className={'ui bottom attached tab segment' + activeClass} data-tab={'tab-' + i}>{tab.component}</div>
            );
        }
        return (
            <div>
                <div className="ui top attached tabular menu">
                    {buttons}
                </div>
                {contents}
            </div>
        );
    }

    changeTab(index) {
        this.setState({ active: index })
    } 
}
