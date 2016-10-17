import React from 'react';
import ReactDOM from 'react-dom';
import { execSync } from 'child_process';
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

    /**
     * Execute a function async
     * @param  {function} func  Function that needs to be executed
     * @return {void}
     */
    static executeAsync(func) {
        if (typeof func === 'function') {
            setTimeout(func, 0);
        }
    }

    static isValidGitDirectory(path) {
        try {
            process.chdir(path);
            let cmd = 'git rev-parse --is-inside-work-tree';
            execSync(cmd);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    /**
     * Return pagination array
     * @param  Integer   current    Current page
     * @param  Integer   total      Total page
     * @return Array
     */
    static getPagination(current, total) {
        current = parseInt(current);
        total = parseInt(total);
        if (current > total || current < 1 || total < 1)
            return [];
        var before = [{
            text: "<",
            disabled: current == 1 ? true : false,
            target: current == 1 ? 0 : current - 1
        }];
        if (current > 5) {
            before = before.concat([{
                text: 1,
                disabled: false,
                target: 1
            }, {
                text: 2,
                disabled: false,
                target: 2
            }, {
                text: "...",
                disabled: true,
                target: 0
            }, {
                text: current - 1,
                disabled: false,
                target: current - 1
            }]);
        } else {
            for (var i = 1; i < current; i++) {
                before.push({
                    text: i,
                    disabled: false,
                    target: i
                });
            }
        }
        var diff = total - current;
        var after = [{
            text: current,
            disabled: false,
            active: true,
            target: 0
        }];
        if (diff > 4) {
            after = after.concat([{
                text: current + 1,
                disabled: false,
                target: current + 1
            }, {
                text: "...",
                disabled: true,
                target: 0
            }, {
                text: total - 1,
                disabled: false,
                target: total - 1
            }, {
                text: total,
                disabled: false,
                target: total
            }, ]);
        } else {
            for (var i = current + 1; i <= total; i++)
                after.push({
                    text: i,
                    disabled: false,
                    target: i
                });
        }
        after.push({
            text: ">",
            disabled: current == total ? true : false,
            target: current == total ? 0 : current + 1
        });
        return before.concat(after);
    }

}
