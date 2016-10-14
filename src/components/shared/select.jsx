import React from 'react';
import ReactDOM from 'react-dom';

export default class Select extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            active: false
        }
        this.toggle = this.toggle.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }
    render() {
        let dropdown = null;
        let activeClass = '';
        if (this.state.active) {
            dropdown = <Dropdown options={this.props.options}/>
            activeClass = ' active visible';
        }
        return (
            <div className={'ui fluid search dropdown selection multiple' + activeClass} onClick={this.toggle} data-toggle="1">
                <i className="dropdown icon" data-toggle="1"></i>
                <a className="ui label transition visible">Selected 1<i className="delete icon"></i></a>
                <a className="ui label transition visible">Selected 2<i className="delete icon"></i></a>
                <input className="search" autoComplete="off" tabIndex="0" onChange={this.inputChange} ref="inputText"/>
                <span className="sizer glv-sizer" ref="inputSizer"></span>
                <div className="default text">Placeholder</div>
                {dropdown}
            </div>
        );
    }
    componentDidMount() {
        this.inputText = ReactDOM.findDOMNode(this.refs.inputText);
        this.inputSizer = ReactDOM.findDOMNode(this.refs.inputSizer);
    }
    toggle(event) {
        let target = event.target;
        if (target.getAttribute('data-toggle') !== '1') {
            return;
        }
        let state = this.state;
        state.active = !state.active;
        if (state.active) {
            this.inputText.focus();
        }
        this.setState(state);
        
    }
    inputChange(event) {
        // Change the size of input element based on input text
        this.inputSizer.innerHTML = this.inputText.value.replace(/\s/g, '&nbsp;');
        this.inputText.style = 'width: ' + this.inputSizer.offsetWidth + 'px';
    }
}

export class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        let options = this.props.options.map((option) => (
            <DropdownItem 
                key={option.value}
                selected={option.selected}
                text={option.text}
            />
        ));
        return <div className="menu transition visible" tabIndex="-1">{options}</div>;
    }
}

export class DropdownItem extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            selected: this.props.selected
        }
    }
    render() {
        let selectedClass = '';
        if (this.state.selected) {
            selectedClass = ' selected';
        }
        return <div className={'item' + selectedClass}>{this.props.text}</div>;
    }
}