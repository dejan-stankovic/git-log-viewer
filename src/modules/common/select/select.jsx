import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import SelectList from './select-list.jsx';

const SelectType = Object.freeze({
    NORMAL: 0,
    BUTTON: 1,
    INLINE: 2
});

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { active: false };

        this.getClass = this.getClass.bind(this);
        this.renderSelected = this.renderSelected.bind(this);
        this.renderInputText = this.renderInputText.bind(this);
        this.renderInputSizer = this.renderInputSizer.bind(this);
        this.renderSelectList = this.renderSelectList.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onDeselect = this.onDeselect.bind(this);
        this.showDropdown = this.showDropdown.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className={this.getClass()} style={this.props.style} onClick={this.showDropdown}>
                {this.renderSelected()}
                {this.renderInputText()}
                {this.renderInputSizer()}
                {this.renderIcon()}
                {this.renderSelectList()}
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener('click', this.hideDropdown, false);
        if (this.props.search) {
            this.inputText = ReactDOM.findDOMNode(this.refs.inputText);
            if (this.props.multiple) {
                this.inputSizer = ReactDOM.findDOMNode(this.refs.inputSizer);
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.hideDropdown, false);
    }

    getClass() {
        let { type, search, multiple } = this.props;
        let className = 'ui dropdown glv-dropdown ';
        if (this.state.active) className += 'active visible ';
        if (type === SelectType.NORMAL) {
            className += 'selection ';
            if (search) className += 'search ';
            if (multiple) className += 'fluid multiple ';
        } else if (type === SelectType.BUTTON) {
            className += 'button scrolling ';
        } else if (type === SelectType.INLINE) {
            className += 'inline scrolling ';
        }
        return className;
    }

    renderSelected() {
        let { selectedOptions, placeHolder, multiple, stringOption, selectedAttr, valueAttr } = this.props;
        if (selectedOptions.length === 0) {
            return <div className="text default" ref="placeHolder">{placeHolder}</div>;
        } else if (!multiple) {
            let option = selectedOptions[0];
            if (!stringOption) {
                option = option[selectedAttr];
            }
            return <div className="text">{option}</div>;
        } else if (!stringOption) {
            return selectedOptions.map((option, i) => (
                <a key={option[valueAttr]} className="ui label" onClick={(e) => this.onDeselect(e, i)}>
                    {option[selectedAttr]}<i className="delete icon"></i>
                </a>
            ));
        } else {
            return selectedOptions.map((option, i) => (
                <a key={i} className="ui label" onClick={(e) => this.onDeselect(e, i)}>
                    {option}<i className="delete icon"></i>
                </a>
            ));
        }
    }

    renderInputText() {
        if (!this.props.search) return null;
        return <input className="search" autoComplete="off" onChange={this.inputChange} ref="inputText"/>;
    }

    renderInputSizer() {
        if (!this.props.search || !this.props.multiple) return null;
        return <span className="sizer glv-sizer" ref="inputSizer"></span>;
    }

    renderIcon() {
        return <i className="dropdown icon"></i>;
    }

    renderSelectList() {
        let { options, selectedOptions, stringOption, valueAttr, optionAttr } = this.props;
        if (!this.state.active) return null;
        return <SelectList 
                options={options}
                selectedOptions={selectedOptions}
                stringOption={stringOption}
                onSelect={this.onSelect}
                valueAttr={valueAttr}
                optionAttr={optionAttr}/>
    }

    inputChange() {
        let { selectedOptions, placeHolder, multiple, onInputChange } = this.props;
        let keyword = this.inputText.value;
        if (selectedOptions.length === 0) {
            let placeHolderDiv = ReactDOM.findDOMNode(this.refs.placeHolder);
            if (keyword.length === 0) {
                placeHolderDiv.innerHTML = placeHolder;
            } else {
                placeHolderDiv.innerHTML = '';
            }
        }
        if (multiple) {
            // Change the size of input element based on input text
            this.inputSizer.innerHTML = keyword.replace(/\s/g, '&nbsp;');
            this.inputText.style = 'width: ' + this.inputSizer.offsetWidth + 'px';
        }
        onInputChange(keyword);
    }

    onSelect(option, selected) {
        let { search, multiple, onChange } = this.props;
        let selectedOptions = [...this.props.selectedOptions];

        if (search) {
            this.inputText.value = '';
            this.inputChange();
        }
        if (selected) return this.setState({ active: false });
        if (multiple || selectedOptions.length === 0) {
            selectedOptions.push(option);
        } else {
            selectedOptions[0] = option;
        }
        this.setState({ active: false });
        onChange(selectedOptions);
    }

    onDeselect(e, i) {
        e.stopPropagation();
        this.inputText.value = '';
        this.inputChange();
        let selectedOptions = [...this.props.selectedOptions];
        selectedOptions.splice(i, 1);
        let { onChange } = this.props;
        onChange(selectedOptions);
    }

    showDropdown(e) {
        e.stopPropagation();
        if (this.props.search) {
            this.inputText.focus();
        }
        this.setState({ active: true });
    }

    hideDropdown() {
        this.setState({ active: false });
    }
}

Select.defaultProps = {
    selectedOptions: [],
    type: SelectType.NORMAL,
    search: false,
    multiple: false,
    stringOption: false,
    valueAttr: 'value',
    optionAttr: 'text',
    selectedAttr: 'text',
    placeHolder: 'Choose an option'
}

Select.propTypes = {
    options: React.PropTypes.array.isRequired,
    selectedOptions: React.PropTypes.array,
    type: React.PropTypes.number,
    search: React.PropTypes.bool,
    multiple: React.PropTypes.bool,
    stringOption: React.PropTypes.bool,
    valueAttr: React.PropTypes.string,
    optionAttr: React.PropTypes.string,
    selectedAttr: React.PropTypes.string,
    placeHolder: React.PropTypes.string,
    onInputChange: React.PropTypes.func,
    onChange: React.PropTypes.func.isRequired,
}

export { Select, SelectType };
