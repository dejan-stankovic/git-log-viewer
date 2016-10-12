import React from 'react';
import Common from '../../utils/common.js';

export default class Pager extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            currentPage: props.currentPage
        };
    }

    render() {
        let currentPage = this.state.currentPage;
        let tmpArray = Common.getPagination(currentPage, this.props.totalPage);
        let pagers = tmpArray.map((tmp, i) => {
            if (tmp.text === '<') {
                if (tmp.disabled) {
                    return <div key={i} className="disabled item"><i className="left chevron icon"></i></div>;
                } else {
                    return <a key={i} className="icon item" onClick={() => this.toPage(tmp.target)}><i className="left chevron icon"></i></a>;
                }
            }
            if (tmp.text === '>') {
                if (tmp.disabled) {
                    return <div key={i} className="disabled item"><i className="right chevron icon"></i></div>;
                } else {
                    return <a key={i} className="icon item" onClick={() => this.toPage(tmp.target)}><i className="right chevron icon"></i></a>;
                }
            }
            if (tmp.active) {
                return <div key={i} className="active item">{tmp.text}</div>;
            }
            if (tmp.disabled) {
                return <div key={i} className="disabled item">{tmp.text}</div>;
            }
            return <a key={i} className="item" onClick={() => this.toPage(tmp.target)}>{tmp.text}</a>;
        });

        return (
            <div className="ui pagination menu">
                {pagers}
            </div>
        );
    }

    toPage(pageNum) {
        this.setState(() => {
            this.state.currentPage = pageNum;
            return this.state;
        });
    }
}
