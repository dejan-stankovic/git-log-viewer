import { combineReducers } from 'redux-seamless-immutable';
import commits from './commits.js';
import control from './control.js';
import filter from './filter.js';
import loading from './loading.js';
import pager from './pager.js';
import repository from './repository.js';
import selection from './selection.js';
import tab from './tab.js';

export default combineReducers({ commits, control, loading, filter, pager, repository, selection, tab });