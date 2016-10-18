import React from 'react';
import ReactDOM from 'react-dom';

export default class Select extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        let state = {
            active: false,
            options: this.props.options
        }

        state.selectedOptions = props.selectedOptions ? props.selectedOptions : [];
        state.valueAttr = props.valueAttr ? props.valueAttr : 'value';
        state.textAttr = props.textAttr ? props.textAttr : 'text';
        state.optionAttr = props.optionAttr ? props.optionAttr : state.textAttr;
        state.selectedAttr = props.selectedAttr ? props.selectedAttr : state.optionAttr;

        this.state = state;

        this.getClass = this.getClass.bind(this);
        this.renderSelected = this.renderSelected.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.filter = this.filter.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onDeselect = this.onDeselect.bind(this);
        this.showDropdown = this.showDropdown.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
    }

    render() {
        let state = this.state;
        let props = this.props;
        let selectedComponent = this.renderSelected();
        let inputText = null;
        let inputSizer = null;
        if (props.searchable) {
            inputText = <input className="search" autoComplete="off" onChange={this.inputChange} ref="inputText"/>;
            if (props.multiple) {
                inputSizer = <span className="sizer glv-sizer" ref="inputSizer"></span>;
            }
        }
        return (
            <div className={this.getClass()} onClick={this.showDropdown}>
                {selectedComponent}
                {inputText}
                {inputSizer}
                <i className="dropdown icon"></i>
                <Dropdown 
                    visible={this.state.active}
                    options={this.state.options}
                    stringOption={this.props.stringOption}
                    onSelect={this.onSelect}
                    onHide={this.hideDropdown}
                    valueAttr={this.state.valueAttr}
                    textAttr={this.state.textAttr}
                    optionAttr={this.state.optionAttr}/>
            </div>
        );
    }

    componentDidMount() {
        if (this.props.searchable) {
            this.inputText = ReactDOM.findDOMNode(this.refs.inputText);
            if (this.props.multiple) {
                this.inputSizer = ReactDOM.findDOMNode(this.refs.inputSizer);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.selectedOptions !== nextProps.selectedOptions) {
            this.setState({ selectedOptions: nextProps.selectedOptions });
        }
    }

    getClass() {
        let props = this.props;
        let className = 'ui dropdown glv-dropdown ';
        if (this.state.active) className += 'active visible ';
        if (props.fluid) className += 'fluid ';
        if (props.inline) className += 'inline scrolling ';
        else if (props.button) className += 'button scrolling ';
        else {
            className += 'selection ';
            if (props.searchable) className += 'search ';
            if (props.multiple) className += 'multiple ';
        }
        return className;
    }

    renderSelected() {
        let props = this.props;
        let state = this.state;
        let selectedOptions = this.state.selectedOptions;
        if (selectedOptions.length === 0) {
            return <div className="text default" ref="placeHolder">{props.placeHolder}</div>;
        } else if (!props.multiple) {
            let option = selectedOptions[0];
            if (!props.stringOption) {
                option = option[state.selectedAttr];
            }
            return <div className="text">{option}</div>;
        } else if (!props.stringOption) {
            return selectedOptions.map((option, i) => (
                <a key={option[state.valueAttr]} className="ui label" onClick={(e) => this.onDeselect(e, option, i)}>
                    {option[state.selectedAttr]}<i className="delete icon"></i>
                </a>
            ));
        } else {
            return selectedOptions.map((option, i) => (
                <a key={i} className="ui label" onClick={(e) => this.onDeselect(e, option, i)}>
                    {option}<i className="delete icon"></i>
                </a>
            ));
        }
    }

    inputChange() {
        let keyword = this.inputText.value;
        if (this.state.selectedOptions.length === 0) {
            let placeHolder = ReactDOM.findDOMNode(this.refs.placeHolder);
            if (keyword.length === 0) {
                placeHolder.innerHTML = this.props.placeHolder;
            } else {
                placeHolder.innerHTML = '';
            }
        }
        if (this.props.multiple) {
            // Change the size of input element based on input text
            this.inputSizer.innerHTML = keyword.replace(/\s/g, '&nbsp;');
            this.inputText.style = 'width: ' + this.inputSizer.offsetWidth + 'px';
        }
        this.filter(keyword);
    }

    filter(keyword) {
        let customFilter = this.props.customFilter;
        let options = this.props.options;
        if (typeof customFilter === 'function') {
            options = options.filter((option) => {
                return customFilter(option, keyword);
            });
        } else if (this.props.stringOption) {
            options = options.filter(option => option.indexOf(keyword) > -1);
        } else {
            options = options.filter(option => option[this.state.textAttr].indexOf(keyword) > -1);
        }
        this.setState({ options: options });
    }

    onSelect(option) {
        if (this.props.searchable) {
            this.inputText.value = '';
        }
        let selectedOptions = this.state.selectedOptions;

        if (this.props.multiple || selectedOptions.length === 0) {
            selectedOptions.push(option);
        } else {
            selectedOptions[0] = option;
        }

        this.setState({
            active: false,
            selectedOptions: selectedOptions
        });

        this.props.onUpdate(this.state.selectedOptions);
    }

    onDeselect(e, option, i) {
        e.stopPropagation();
        if (option && typeof option === 'object') option.selected = false;
        this.state.selectedOptions.splice(i, 1);
        this.setState({
            selectedOptions: this.state.selectedOptions
        });
        this.props.onUpdate(this.state.selectedOptions);
    }

    showDropdown(e) {
        e.stopPropagation();
        if (this.props.searchable) {
            this.inputText.focus();
        }
        this.setState({ active: true });
    }

    hideDropdown() {
        this.setState({ active: false });
    }
}

export class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            visible: this.props.visible
        }
        this.onSelect = this.onSelect.bind(this);
    }

    render() {
        if (this.props.options.length === 0) return null;
        let visibleClass = this.state.visible ? 'visible' : 'hidden';
        let options = [];
        if (this.props.stringOption) {
            options = this.props.options.map((option) => {
                return (
                    <div key={option} className="item" onClick={(e) => this.onSelect(e, option)}>
                        {option}
                    </div>
                );
            });
        } else {
            let value = this.props.valueAttr;
            let text = this.props.textAttr;
            let disp = this.props.optionAttr;
            options = this.props.options.map((option, i) => {
                let selectedClass = option.selected ? 'selected' : '';
                return (
                    <div key={option[value]} className={'item ' + selectedClass} onClick={(e) => this.onSelect(e, option)}>
                        {option[disp]}
                    </div>
                );
            });
        }
        return <div className={'menu transition ' + visibleClass} tabIndex="-1">{options}</div>;
    }

    componentDidMount() {
        window.addEventListener('click', this.props.onHide, false);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.props.onHide, false);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ visible: nextProps.visible });
    }

    onSelect(e, option) {
        e.stopPropagation();
        this.props.onSelect(option);
        this.props.onHide();
    }
}
