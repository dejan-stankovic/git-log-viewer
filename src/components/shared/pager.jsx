import React from 'react';
import Common from '../../utils/common.js';

import Select from './select.jsx';

export default class Pager extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            currentPage: props.currentPage
        };
        this.onPageChanged = this.onPageChanged.bind(this);
        this.updatePageSize = this.updatePageSize.bind(this);
    }

    render() {
        let tmpArray = Common.getPagination(this.state.currentPage, this.props.totalPage);
        let pagers = tmpArray.map((tmp, i) => <PagerItem key={i} data={tmp} onChange={this.onPageChanged}/>);
        return (
            <div className="ui grid">
                <div className="ten wide column"><div className="ui pagination menu">{pagers}</div></div>
                <div className="six wide right aligned column">
                    <label>
                        Show&nbsp;
                        <Select
                            options={this.props.pageSizes}
                            stringOption="true"
                            selectedOptions={this.props.pageSizes.slice(0, 1)}
                            onUpdate={this.updatePageSize}/>
                        &nbsp;items
                    </label>
                </div>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({
                currentPage: nextProps.currentPage,
                totalPage: nextProps.totalPage
            });
        }
    }

    onPageChanged(pageNum) {
        this.props.onPageChanged(pageNum);
    }

    updatePageSize(selected) {
        let pageSize = selected[0];
        this.props.onPageSizeChanged(pageSize);
    }
}

export class PagerItem extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            active: props.data.active
        }
        this.onChange = this.onChange.bind(this);
    }

    render() {
        let data = this.props.data;
        let className = 'item ';
        if (data.disabled) className += 'disabled ';
        if (this.state.active) className += 'active ';
        let text = data.text;
        if (text === '<') {
            text = <i className="left chevron icon"></i>;
        } else if (text === '>') {
            text = <i className="right chevron icon"></i>;
        }
        if (data.disabled || data.active) {
            return <div className={className}>{text}</div>;
        } else {
            return <a className={className} onClick={this.onChange}>{text}</a>;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({ active: nextProps.data.active });
        }
    }

    onChange(e) {
        e.stopPropagation();
        this.props.onChange(this.props.data.target);
    }
}
