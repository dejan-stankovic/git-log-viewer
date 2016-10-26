import React from 'react';
import { connect } from 'react-redux';
import AppConst from 'constants/app.js';
import { Loader, Pager } from 'modules/common';
import CommitsControl from 'modules/detail/components/commits-control.jsx';
import CommitsFilter from 'modules/detail/components/commits-filter.jsx';
import CommitsList from 'modules/detail/components/commits-list.jsx';
import { CommitsAction, PagerAction } from 'modules/detail/actions';

class Commits extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.changePage = this.changePage.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
    }

    render() {
        let { pager } = this.props;
        return (
            <div>
                <Pager
                    current={pager.current}
                    total={pager.total}
                    size={pager.size}
                    sizes={AppConst.PAGER_SIZE_AVAIABLE}
                    changePage={this.changePage}
                    changePageSize={this.changePageSize}/>
                <CommitsControl/>
                <CommitsFilter/>
                <CommitsList/>
            </div>
        )
    }

    changePage(page) {
        this.props.changePage(page);
    }

    changePageSize(size) {
        this.props.changePageSize(size);
    }
}

const mapStateToProps = state => {
    return {
        pager: state.pager,
        commits: state.commits
    };
}

const mapDispatchToProps = dispatch => {
    return {
        changePage: page => dispatch(PagerAction.changePage(page)),
        changePageSize: size => dispatch(PagerAction.changePageSize(size))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Commits);