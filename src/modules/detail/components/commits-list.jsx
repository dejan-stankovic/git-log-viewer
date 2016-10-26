import React from 'react';
import { connect } from 'react-redux';
import { Loader } from 'modules/common';
import CommitsItem from 'modules/detail/components/commits-list-item.jsx';
import { CommitsAction, SelectionAction } from 'modules/detail/actions';

class CommitsList extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        let { commits, selection, toggleSelect } = this.props;
        if (commits.loading) {
            return <Loader text="Getting Commit Logs"/>;
        } else {
            let items = commits.data.map((commit, i) => {
                let checked = false;
                if (selection.indexes.indexOf(i) > -1) checked = true;
                return <CommitsItem
                            key={commit.hash}
                            commit={commit}
                            checked={checked}
                            onChange={() => toggleSelect(i)}/>;
            });
            return <div className="ui vertically divided grid glv-margin-top">{items}</div>;
        }
        
    }

    componentDidMount() {
        this.props.getCommits();
    }
}

const mapStateToProps = state => {
    return {
        commits: state.commits,
        selection: state.selection
    };
}
const mapDispatchToProps = dispatch => {
    return {
        getCommits: () => dispatch(CommitsAction.getCommits(true)),
        toggleSelect: i => dispatch(SelectionAction.toggleSelect(i))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommitsList);
