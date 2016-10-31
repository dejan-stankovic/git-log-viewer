import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { remote } from 'electron';
import Immutable from 'seamless-immutable';
import Common from 'utils/common.js';

import Modal from 'modules/modal/modal.jsx';
import modalReducer from 'modules/modal/reducers';

const data = remote.getCurrentWindow().data;
process.chdir(data.gitdir);
const initState = Immutable({ data: data });
const store = createStore(modalReducer, initState, applyMiddleware(thunk));
Common.renderPage(<Provider store={store}><Modal/></Provider>);