import { combineReducers } from 'redux-seamless-immutable';
import data from './data.js';
import diffType from './diffType.js';
import files from './files.js';
import ready from './ready.js';
import target from './target.js';
import output from './output.js';

export default combineReducers({ data, diffType, files, ready, target, output });