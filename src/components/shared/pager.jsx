import React from 'react';

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
        if (currentPage === 1) {
            let leftArrow = <div className="disabled item"><i className="left chevron icon"></i></div>;
            let pageOne = <div className="disabled item">1</div>;
        } else {
            let leftArrow = <a className="icon item" onClick={() => this.toPage(currentPage - 1)}><i className="left chevron icon"></i></a>;
            let pageOne = <a className="icon item" onClick={() => this.toPage(1)}>1</a>;
        }
        return (
            <div className="ui pagination menu">
                <a className="icon item">
                    <i className="left chevron icon"></i>
                </a>
                <a className="item">1</a>
                <a className="item">2</a>
                <div className="disabled item">...</div>
                <a className="item">{this.props.totalPage}</a>
                <a className="icon item">
                    <i className="right chevron icon"></i>
                </a>
            </div>
        );
    }

    toPage(pageNum) {

    }
}
