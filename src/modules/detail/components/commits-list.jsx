import React from 'react';
import { connect } from 'react-redux';
import { Loader } from 'modules/common';
import CommitsItem from 'modules/detail/components/commits-list-item.jsx';
import { CommitsAction } from 'modules/detail/actions';

class CommitsList extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        let commits = this.props.commits;
        if (commits.loading) {
            return <Loader text="Getting Commit Logs"/>;
        } else {
            let items = commits.data.map((commit) => {
                return <CommitsItem key={commit.hash} commit={commit}/>;
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
        commits: state.commits
    };
}
const mapDispatchToProps = dispatch => {
    return {
        getCommits: () => dispatch(CommitsAction.getCommits(true))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommitsList);
