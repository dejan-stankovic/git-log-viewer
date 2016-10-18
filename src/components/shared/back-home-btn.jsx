import React from 'react';
import Common from '../../utils/common.js';

import Home from '../home.jsx';

export default class BackButton extends React.Component {
    render() {
        return (
            <button className="ui green button" onClick={this.backToHome}>
                <i className="caret left icon"></i> Back to Home
            </button>
        );
    }

    backToHome() {
        Common.renderPage(<Home/>);
    }
}


