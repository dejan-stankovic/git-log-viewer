import React from 'react';
import ReactDOM from 'react-dom';
import { execSync } from 'child_process';
import { ipcRenderer } from 'electron';
import AppConst from 'constants/app.js';
import ActionType from 'constants/actiontype.js';

export default class Common {
    /**
     * Render whole page
     * @param  {React.Component} component
     * @return {void}
     */
    static renderPage(component) {
        ReactDOM.render(component, document.getElementById(AppConst.HTML_APP_ID));
    }

    /**
     * Display error dialog
     * @param  {String} title   Title of error box
     * @param  {String} content Error content
     * @return {void}
     */
    static showErrorBox(title, content) {
        ipcRenderer.send(AppConst.CHANNEL_SHOW_ERR_BOX, title, content);
    }

    /**
     * Action creator
     * @param  {String} type The key of action
     * @param  {Any} data    The data for action
     * @return {Object}      Action object
     */
    static getAction(type, data) {
        let action = { type: ActionType[type] };
        if (typeof data !== 'undefined') {
            action.data = data;
        }
        return action;
    }
}
