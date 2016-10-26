import React from 'react';
import { connect } from 'react-redux';
import Common from 'utils/common';
import Git from 'utils/git';
import { RepositoryAction, TabAction } from 'modules/detail/actions';
import { Button, Select, SelectType, Loader, Tab } from 'modules/common';
import Home from 'modules/home/home.jsx';
import Commits from 'modules/detail/components/commits.jsx';
import Information from 'modules/detail/components/information.jsx';

class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.renderContent = this.renderContent.bind(this);
		this.goHome = this.goHome.bind(this);
	}

	render() {
		let repo = this.props.repository;
		return (
			<div>
				<Button buttonClass="green" iconClass="caret left" label="Back to Home" onClick={this.goHome}/>
				<Button label="Fetch all" onClick={this.props.fetchAll}/>
				<Select
					type={SelectType.BUTTON}
                    options={repo.branches}
                    stringOption={true}
                    selectedOptions={[repo.currentBranch]}
                    button={true}
                    onChange={this.props.changeBranch}/>
				{this.renderContent()}
			</div>
		)
	}

	renderContent() {
		if (this.props.loading) {
			return <Loader text="Getting data. Please wait..."/>;
		}
		let tabs = [
            { name: 'Commits', component: <Commits/> },
            { name: 'Information', component: <Information/> }
        ];
        return <Tab data={tabs} active={this.props.tab} changeTab={this.props.changeTab}/>;
	}

	goHome() {
		Common.renderPage(<Home/>);
	}

}

const mapStateToProps = state => {
	return {
		loading: state.loading,
		tab: state.tab,
		repository: state.repository
	};
}

const mapDispatchToProps = dispatch => {
	return {
		fetchAll: () => dispatch(RepositoryAction.fetchAll()),
		changeBranch: selectedOptions => dispatch(RepositoryAction.changeBranch(selectedOptions[0])),
		changeTab: index => dispatch(TabAction.changeTab(index))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);