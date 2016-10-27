import React from 'react';


export default class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		return (
			<div id="modal" className="glv-modal">
		        <div className="glv-modal-top">
		            <div id="modal-loader" className="ui segment glv-modal-loader" style={{display: 'none'}}>
		                <div className="ui active inverted dimmer">
		                    <div className="ui medium text loader">Loading</div>
		                </div>
		            </div>
		            <form className="ui form">
		                <div className="field">
		                    <label>Target Branch:</label>
		                    <div className="ui compact menu">
		                        <div className="ui simple dropdown item">
		                            <span id="selected-branch">Choose a branch</span>
		                            <i className="dropdown icon"></i>
		                            <div id="branches" className="menu">
		                            </div>
		                        </div>
		                    </div>
		                </div>
		                <div className="field">
		                    <label>List files to diff:</label>
		                    <ol id="list-files">
		                    	
		                    </ol>
		                </div>
		            </form>
		        </div>
		        <div className="glv-modal-bottom">
		            <div id="cancel-btn" className="ui black deny button">Cancel</div>
		            <div className="ui positive right labeled icon button">
		                Let's do it
		                <i className="checkmark icon"></i>
		            </div>
		        </div>
		    </div>
		)
	}
}