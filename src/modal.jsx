import React from 'react';
import ReactDOM from 'react-dom';
import { remote } from 'electron';
import Common from 'utils/common.js';
import Modal from 'modules/modal/modal.jsx';

let data = remote.getCurrentWindow().data;
process.chdir(data.gitdir);

Common.renderPage(<Modal data={data}/>);