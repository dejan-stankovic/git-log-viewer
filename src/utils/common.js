import React from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
import * as AppConst from '../appconst.js';

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
     * Render to an element
     * @param  {React.Component} component
     * @param  {String} elementId Id of the element in HTML
     * @return {void}
     */
    static renderElement(component, elementId) {
        let element = document.getElementById(elementId);
        if (element === null) {
            console.error('Could not found element in DOM');
            return;
        }
        ReactDOM.render(component, element);
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
}
