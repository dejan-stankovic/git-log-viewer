webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(33);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _common = __webpack_require__(171);

	var _common2 = _interopRequireDefault(_common);

	var _home = __webpack_require__(176);

	var _home2 = _interopRequireDefault(_home);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_common2.default.renderPage(_react2.default.createElement(_home2.default, null));

/***/ },

/***/ 171:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(33);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _child_process = __webpack_require__(172);

	var _electron = __webpack_require__(173);

	var _app = __webpack_require__(174);

	var _app2 = _interopRequireDefault(_app);

	var _actiontype = __webpack_require__(175);

	var _actiontype2 = _interopRequireDefault(_actiontype);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Common = function () {
	    function Common() {
	        _classCallCheck(this, Common);
	    }

	    _createClass(Common, null, [{
	        key: 'renderPage',

	        /**
	         * Render whole page
	         * @param  {React.Component} component
	         * @return {void}
	         */
	        value: function renderPage(component) {
	            _reactDom2.default.render(component, document.getElementById(_app2.default.HTML_APP_ID));
	        }

	        /**
	         * Display error dialog
	         * @param  {String} title   Title of error box
	         * @param  {String} content Error content
	         * @return {void}
	         */

	    }, {
	        key: 'showErrorBox',
	        value: function showErrorBox(title, content) {
	            _electron.ipcRenderer.send(_app2.default.CHANNEL_SHOW_ERR_BOX, title, content);
	        }

	        /**
	         * Action creator
	         * @param  {String} type The key of action
	         * @param  {Any} data    The data for action
	         * @return {Object}      Action object
	         */

	    }, {
	        key: 'getAction',
	        value: function getAction(type, data) {
	            var action = { type: _actiontype2.default[type] };
	            if (typeof data !== 'undefined') {
	                action.data = data;
	            }
	            return action;
	        }
	    }]);

	    return Common;
	}();

	exports.default = Common;

/***/ },

/***/ 172:
/***/ function(module, exports) {

	module.exports = require("child_process");

/***/ },

/***/ 174:
/***/ function(module, exports) {

	'use strict';

	module.exports = Object.freeze({
		HTML_APP_ID: 'app',
		CHANNEL_SHOW_DIR_DIALOG: 'show-dir-dialog',
		CHANNEL_SELECTED_DIR: 'selected-dir',
		CHANNEL_SHOW_ERR_BOX: 'show-err-box',
		CHANNEL_COMMITS_REPORT: 'export-commits-report',
		CHANNEL_MERGE_DIFF_REPORT: 'export-merge-diff-report',
		PAGER_SIZE_AVAIABLE: [50, 100, 150, 200, 300, 500],
		PAGER_DEFAULT_SIZE: 50,
		EXEC_OPTIONS: { maxBuffer: 1000 * 1024 }
	});

/***/ },

/***/ 175:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Object.freeze({
		START_GET_COMMITS: 100,
		END_GET_COMMITS: 101,

		TOGGLE_FILTER: 200,
		UPDATE_FILTER: 201,
		SET_ALL_USERS: 202,
		SET_USERS: 203,
		SET_MESSAGE: 204,
		SET_FROM_DATE: 205,
		SET_TO_DATE: 206,
		RESET_FILTER: 207,

		START_LOADING: 300,
		END_LOADING: 301,

		CHANGE_PAGE: 400,
		CHANGE_PAGE_SIZE: 401,
		UPDATE_PAGER: 402,

		UPDATE_REPOSITORY: 500,
		CHANGE_BRANCH: 501,

		CHANGE_TAB: 600,

		UPDATE_SELECTION: 700,

		CONTROL_START_ACTION: 800,
		CONTROL_STOP_ACTION: 801
	});

/***/ },

/***/ 176:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(33);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _electron = __webpack_require__(173);

	var _redux = __webpack_require__(177);

	var _reduxThunk = __webpack_require__(192);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reactRedux = __webpack_require__(193);

	var _seamlessImmutable = __webpack_require__(202);

	var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

	var _app = __webpack_require__(174);

	var _app2 = _interopRequireDefault(_app);

	var _git = __webpack_require__(203);

	var _git2 = _interopRequireDefault(_git);

	var _common = __webpack_require__(171);

	var _common2 = _interopRequireDefault(_common);

	var _repo = __webpack_require__(206);

	var _repo2 = _interopRequireDefault(_repo);

	var _detail = __webpack_require__(207);

	var _detail2 = _interopRequireDefault(_detail);

	var _reducers = __webpack_require__(234);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Home = function (_React$Component) {
	    _inherits(Home, _React$Component);

	    function Home() {
	        _classCallCheck(this, Home);

	        var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this));

	        _this.chooseDir = _this.chooseDir.bind(_this);
	        _this.collectData = _this.collectData.bind(_this);
	        return _this;
	    }

	    _createClass(Home, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'div',
	                    { className: 'ui header centered' },
	                    _react2.default.createElement(
	                        'h1',
	                        { className: 'ui header icon glv-header' },
	                        _react2.default.createElement('i', { className: 'git square icon' }),
	                        'Git Log Viewer'
	                    ),
	                    _react2.default.createElement(
	                        'p',
	                        null,
	                        'Simple Git Log Viewer built with Electron, ReactJS & Semantic UI'
	                    ),
	                    _react2.default.createElement(
	                        'button',
	                        { className: 'ui large blue button', onClick: this.chooseDir },
	                        _react2.default.createElement('i', { className: 'folder open outline icon' }),
	                        ' Choose your git directory'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'glv-hidden', ref: 'loader' },
	                    _react2.default.createElement('div', { className: 'ui active centered inline small loader' }),
	                    _react2.default.createElement(
	                        'p',
	                        { className: 'glv-centered' },
	                        'Initializing data. Please wait...'
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.loader = _reactDom2.default.findDOMNode(this.refs.loader);
	        }
	    }, {
	        key: 'chooseDir',
	        value: function chooseDir() {
	            _electron.ipcRenderer.send(_app2.default.CHANNEL_SHOW_DIR_DIALOG, _app2.default.CHANNEL_SELECTED_DIR);
	            _electron.ipcRenderer.once(_app2.default.CHANNEL_SELECTED_DIR, this.collectData);
	        }
	    }, {
	        key: 'collectData',
	        value: function collectData(e, path) {
	            var _this2 = this;

	            this.showLoader();
	            process.chdir(path[0]);
	            var promises = [];
	            promises.push(_git2.default.getURL());
	            promises.push(_git2.default.getCurrentBranch());
	            promises.push(_git2.default.getBranches());
	            promises.push(_git2.default.getUsers());
	            promises.push(_git2.default.getCommitsCount());
	            Promise.all(promises).then(function (values) {
	                var repository = new _repo2.default();
	                repository.url = values[0];
	                repository.currentBranch = values[1];
	                repository.branches = values[2];
	                repository.users = values[3];
	                repository.commitsCount = values[4];
	                var initialState = (0, _seamlessImmutable2.default)({
	                    repository: repository,
	                    pager: {
	                        current: 1,
	                        size: _app2.default.PAGER_DEFAULT_SIZE,
	                        total: Math.ceil(repository.commitsCount / _app2.default.PAGER_DEFAULT_SIZE)
	                    }
	                });
	                var store = (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.applyMiddleware)(_reduxThunk2.default));
	                _common2.default.renderPage(_react2.default.createElement(
	                    _reactRedux.Provider,
	                    { store: store },
	                    _react2.default.createElement(_detail2.default, null)
	                ));
	            }).catch(function (err) {
	                throw err;
	                _common2.default.showErrorBox('Invalid directory', 'Your directory is not a Git directory.\nPlease try again.');
	                _this2.hideLoader();
	            });
	        }
	    }, {
	        key: 'showLoader',
	        value: function showLoader() {
	            this.loader.className = '';
	        }
	    }, {
	        key: 'hideLoader',
	        value: function hideLoader() {
	            this.loader.className = 'glv-hidden';
	        }
	    }]);

	    return Home;
	}(_react2.default.Component);

	exports.default = Home;

/***/ },

/***/ 203:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _child_process = __webpack_require__(172);

	var _app = __webpack_require__(174);

	var _app2 = _interopRequireDefault(_app);

	var _commit = __webpack_require__(204);

	var _user = __webpack_require__(205);

	var _user2 = _interopRequireDefault(_user);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	module.exports = function () {
	    function Git() {
	        _classCallCheck(this, Git);
	    }

	    _createClass(Git, null, [{
	        key: 'getURL',
	        value: function getURL() {
	            return new Promise(function (resolve, reject) {
	                var cmd = 'git config --get remote.origin.url';
	                (0, _child_process.exec)(cmd, _app2.default.EXEC_OPTIONS, function (error, stdout, stderr) {
	                    if (error) {
	                        console.error(error);
	                        reject(error);
	                    }
	                    resolve(stdout);
	                });
	            });
	        }
	    }, {
	        key: 'getCurrentBranch',
	        value: function getCurrentBranch() {
	            return new Promise(function (resolve, reject) {
	                var cmd = 'git rev-parse --abbrev-ref HEAD';
	                (0, _child_process.exec)(cmd, _app2.default.EXEC_OPTIONS, function (error, stdout, stderr) {
	                    if (error) {
	                        console.error(error);
	                        reject(error);
	                    }
	                    resolve(stdout);
	                });
	            });
	        }
	    }, {
	        key: 'getBranches',
	        value: function getBranches() {
	            return new Promise(function (resolve, reject) {
	                var cmd = 'git branch -a';
	                (0, _child_process.exec)(cmd, _app2.default.EXEC_OPTIONS, function (error, stdout, stderr) {
	                    if (error) {
	                        console.error(error);
	                        reject(error);
	                    }
	                    var branches = stdout.split(/[\r\n]+/g);
	                    var result = [];
	                    var _iteratorNormalCompletion = true;
	                    var _didIteratorError = false;
	                    var _iteratorError = undefined;

	                    try {
	                        for (var _iterator = branches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                            var branch = _step.value;

	                            branch = branch.trim();
	                            if (branch === '' || branch.indexOf('->') > -1) continue;
	                            if (branch.substring(0, 2) === '* ') {
	                                branch = branch.substring(2);
	                            }
	                            result.push(branch);
	                        }
	                    } catch (err) {
	                        _didIteratorError = true;
	                        _iteratorError = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion && _iterator.return) {
	                                _iterator.return();
	                            }
	                        } finally {
	                            if (_didIteratorError) {
	                                throw _iteratorError;
	                            }
	                        }
	                    }

	                    resolve(result);
	                });
	            });
	        }
	    }, {
	        key: 'getUsers',
	        value: function getUsers() {
	            var branch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	            return new Promise(function (resolve, reject) {
	                var cmd = 'git log --pretty=[%cE][%cN]';
	                if (branch !== '') cmd += ' ' + branch;
	                (0, _child_process.exec)(cmd, _app2.default.EXEC_OPTIONS, function (error, stdout, stderr) {
	                    if (error) {
	                        console.error(error);
	                        reject(error);
	                    }
	                    var regexp = /\[(.+?)\]\[(.+?)\][\r\n]+/g;
	                    var match = regexp.exec(stdout);
	                    var emails = [];
	                    var users = [];
	                    while (match !== null) {
	                        var email = match[1].toLowerCase();
	                        if (emails.indexOf(email) === -1) {
	                            emails.push(email);
	                            users.push(new _user2.default(match[2], email));
	                        }
	                        match = regexp.exec(stdout);
	                    }
	                    resolve(users);
	                });
	            });
	        }
	    }, {
	        key: 'getCommitsCount',
	        value: function getCommitsCount() {
	            var branch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	            var users = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	            var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	            var fromDate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
	            var toDate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

	            var cmd = 'git log --pretty=%h --regexp-ignore-case';
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = users[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var user = _step2.value;

	                    cmd += ' --committer=' + user.email;
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            if (message !== '') {
	                cmd += ' --grep=' + message.toLowerCase();
	            }
	            if (fromDate !== '') {
	                cmd += ' --since=' + fromDate;
	            }
	            if (toDate !== '') {
	                cmd += ' --before=' + toDate;
	            }
	            if (branch !== '') cmd += ' ' + branch;
	            return new Promise(function (resolve, reject) {
	                (0, _child_process.exec)(cmd, _app2.default.EXEC_OPTIONS, function (error, stdout, stderr) {
	                    if (error) {
	                        console.error(error);
	                        reject(error);
	                    }
	                    var lines = stdout.split(/[\r\n]+/g);
	                    resolve(lines.length);
	                });
	            });
	        }
	    }, {
	        key: 'getCommits',
	        value: function getCommits() {
	            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	            var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _app2.default.PAGER_DEFAULT_SIZE;
	            var branch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	            var users = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
	            var message = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
	            var fromDate = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
	            var toDate = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';

	            if (isNaN(page) || page < 1) {
	                page = 1;
	            }
	            if (isNaN(pageSize) || pageSize < 1) {
	                pageSize = _app2.default.PAGER_DEFAULT_SIZE;
	            }
	            var cmd = 'git log --pretty=[%H][%cN][%cE][%cd][%s] --date=format:"%Y/%m/%d %H:%M:%S" --regexp-ignore-case';
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = users[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var user = _step3.value;

	                    cmd += ' --committer=' + user.email;
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }

	            if (message !== '') {
	                cmd += ' --grep=' + message.toLowerCase();
	            }
	            if (fromDate !== '') {
	                cmd += ' --since=' + fromDate;
	            }
	            if (toDate !== '') {
	                cmd += ' --before=' + toDate;
	            }
	            cmd += ' --max-count=' + pageSize + ' --skip=' + (page - 1) * pageSize;
	            if (branch !== '') cmd += ' ' + branch;
	            return new Promise(function (resolve, reject) {
	                (0, _child_process.exec)(cmd, _app2.default.EXEC_OPTIONS, function (error, stdout, stderr) {
	                    if (error) {
	                        console.error(error);
	                        reject(error);
	                    }
	                    var commits = [];
	                    var regexp = /\[(.+?)\]\[(.+?)\]\[(.+?)\]\[(.+?)\]\[(.+)\][\r\n]+/g;
	                    var match = regexp.exec(stdout);
	                    while (match !== null) {
	                        var commit = new _commit.Commit(match[1], match[2], match[3], match[4], match[5]);
	                        commits.push(commit);
	                        match = regexp.exec(stdout);
	                    }
	                    resolve(commits);
	                });
	            });
	        }
	    }, {
	        key: 'getFilesByCommitHash',
	        value: function getFilesByCommitHash(hash) {
	            var cmd = 'git log -m -1 --pretty= --name-status ' + hash;
	            return new Promise(function (resolve, reject) {
	                (0, _child_process.exec)(cmd, _app2.default.EXEC_OPTIONS, function (error, stdout, stderr) {
	                    if (error) {
	                        console.error(error);
	                        reject(error);
	                    }
	                    var files = [];
	                    var regexp = /(\w+)\s+(\S+)(\s+(\S+))?[\r\n]+/g;
	                    var match = regexp.exec(stdout);
	                    while (match !== null) {
	                        var file = new _commit.CommitFile(match[1], match[2]);
	                        files.push(file);
	                        match = regexp.exec(stdout);
	                    }
	                    resolve(files);
	                });
	            });
	        }
	    }, {
	        key: 'getFilesByCommits',
	        value: function getFilesByCommits(commits) {
	            var _this = this;

	            return new Promise(function (resolve, reject) {
	                var promises = [];
	                var _iteratorNormalCompletion4 = true;
	                var _didIteratorError4 = false;
	                var _iteratorError4 = undefined;

	                try {
	                    for (var _iterator4 = commits[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                        var commit = _step4.value;

	                        promises.push(_this.getFilesByCommitHash(commit.hash));
	                    }
	                } catch (err) {
	                    _didIteratorError4 = true;
	                    _iteratorError4 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                            _iterator4.return();
	                        }
	                    } finally {
	                        if (_didIteratorError4) {
	                            throw _iteratorError4;
	                        }
	                    }
	                }

	                Promise.all(promises).then(function (values) {
	                    var data = values.map(function (value, i) {
	                        var commit = commits[i].asMutable({ deep: true });
	                        commit.files = value;
	                        return commit;
	                    });
	                    resolve(data);
	                }).catch(function (err) {
	                    reject(null);
	                });
	            });
	        }
	    }, {
	        key: 'fetchAll',
	        value: function fetchAll() {
	            var cmd = 'git fetch --all';
	            return new Promise(function (resolve, reject) {
	                (0, _child_process.exec)(cmd, _app2.default.EXEC_OPTIONS, function (error, stdout, stderr) {
	                    if (error) {
	                        console.error(error);
	                        reject(stderr);
	                    }
	                    resolve(stdout);
	                });
	            });
	        }
	    }]);

	    return Git;
	}();

/***/ },

/***/ 204:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Commit = exports.Commit = function Commit(hash, username, email, date, message) {
	    _classCallCheck(this, Commit);

	    this.hash = hash;
	    this.username = username;
	    this.email = email;
	    this.date = date;
	    this.message = message;
	    this.files = null;
	};

	var CommitFile = exports.CommitFile = function CommitFile(status, filePath) {
	    _classCallCheck(this, CommitFile);

	    this.status = status;
	    this.filePath = filePath;
	};

/***/ },

/***/ 205:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var User = function User(name, email) {
	    _classCallCheck(this, User);

	    this.name = name;
	    this.email = email;
	};

	exports.default = User;

/***/ },

/***/ 206:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _git = __webpack_require__(203);

	var _git2 = _interopRequireDefault(_git);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var thissitory = function () {
		function thissitory() {
			_classCallCheck(this, thissitory);

			this.url = '';
			this.currentBranch = '';
			this.branches = [];
			this.users = [];
			this.commitsCount = 0;
		}

		_createClass(thissitory, [{
			key: 'collectData',
			value: function collectData() {
				this.url = _git2.default.getURL();
				this.currentBranch = _git2.default.getCurrentBranch();
				this.branches = _git2.default.getBranches();
				this.users = _git2.default.getUsers(this.currentBranch);
				this.commitsCount = _git2.default.getCommitsCount(this.currentBranch);
			}
		}]);

		return thissitory;
	}();

	exports.default = thissitory;

/***/ },

/***/ 207:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(193);

	var _common = __webpack_require__(171);

	var _common2 = _interopRequireDefault(_common);

	var _git = __webpack_require__(203);

	var _git2 = _interopRequireDefault(_git);

	var _actions = __webpack_require__(208);

	var _common3 = __webpack_require__(217);

	var _home = __webpack_require__(176);

	var _home2 = _interopRequireDefault(_home);

	var _commits = __webpack_require__(228);

	var _commits2 = _interopRequireDefault(_commits);

	var _information = __webpack_require__(233);

	var _information2 = _interopRequireDefault(_information);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Detail = function (_React$Component) {
		_inherits(Detail, _React$Component);

		function Detail(props) {
			_classCallCheck(this, Detail);

			var _this = _possibleConstructorReturn(this, (Detail.__proto__ || Object.getPrototypeOf(Detail)).call(this, props));

			_this.props = props;
			_this.renderContent = _this.renderContent.bind(_this);
			_this.goHome = _this.goHome.bind(_this);
			return _this;
		}

		_createClass(Detail, [{
			key: 'render',
			value: function render() {
				var repo = this.props.repository;
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_common3.Button, { buttonClass: 'green', iconClass: 'caret left', label: 'Back to Home', onClick: this.goHome }),
					_react2.default.createElement(_common3.Button, { label: 'Fetch all', onClick: this.props.fetchAll }),
					_react2.default.createElement(_common3.Select, {
						type: _common3.SelectType.BUTTON,
						options: repo.branches,
						stringOption: true,
						selectedOptions: [repo.currentBranch],
						button: true,
						onChange: this.props.changeBranch }),
					this.renderContent()
				);
			}
		}, {
			key: 'renderContent',
			value: function renderContent() {
				if (this.props.loading) {
					return _react2.default.createElement(_common3.Loader, { text: 'Getting data. Please wait...' });
				}
				var tabs = [{ name: 'Commits', component: _react2.default.createElement(_commits2.default, null) }, { name: 'Information', component: _react2.default.createElement(_information2.default, null) }];
				return _react2.default.createElement(_common3.Tab, { data: tabs, active: this.props.tab, changeTab: this.props.changeTab });
			}
		}, {
			key: 'goHome',
			value: function goHome() {
				_common2.default.renderPage(_react2.default.createElement(_home2.default, null));
			}
		}]);

		return Detail;
	}(_react2.default.Component);

	var mapStateToProps = function mapStateToProps(state) {
		return {
			loading: state.loading,
			tab: state.tab,
			repository: state.repository
		};
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
		return {
			fetchAll: function fetchAll() {
				return dispatch(_actions.RepositoryAction.fetchAll());
			},
			changeBranch: function changeBranch(selectedOptions) {
				return dispatch(_actions.RepositoryAction.changeBranch(selectedOptions[0]));
			},
			changeTab: function changeTab(index) {
				return dispatch(_actions.TabAction.changeTab(index));
			}
		};
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Detail);

/***/ },

/***/ 208:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.TabAction = exports.SelectionAction = exports.RepositoryAction = exports.PagerAction = exports.LoadingAction = exports.FilterAction = exports.ControlAction = exports.CommitsAction = undefined;

	var _commits = __webpack_require__(209);

	var _commits2 = _interopRequireDefault(_commits);

	var _control = __webpack_require__(212);

	var _control2 = _interopRequireDefault(_control);

	var _filter = __webpack_require__(213);

	var _filter2 = _interopRequireDefault(_filter);

	var _loading = __webpack_require__(214);

	var _loading2 = _interopRequireDefault(_loading);

	var _pager = __webpack_require__(210);

	var _pager2 = _interopRequireDefault(_pager);

	var _repository = __webpack_require__(215);

	var _repository2 = _interopRequireDefault(_repository);

	var _selection = __webpack_require__(211);

	var _selection2 = _interopRequireDefault(_selection);

	var _tab = __webpack_require__(216);

	var _tab2 = _interopRequireDefault(_tab);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.CommitsAction = _commits2.default;
	exports.ControlAction = _control2.default;
	exports.FilterAction = _filter2.default;
	exports.LoadingAction = _loading2.default;
	exports.PagerAction = _pager2.default;
	exports.RepositoryAction = _repository2.default;
	exports.SelectionAction = _selection2.default;
	exports.TabAction = _tab2.default;

/***/ },

/***/ 209:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _common = __webpack_require__(171);

	var _common2 = _interopRequireDefault(_common);

	var _git = __webpack_require__(203);

	var _git2 = _interopRequireDefault(_git);

	var _pager = __webpack_require__(210);

	var _pager2 = _interopRequireDefault(_pager);

	var _selection = __webpack_require__(211);

	var _selection2 = _interopRequireDefault(_selection);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CommitsAction = function () {
	    function CommitsAction() {
	        _classCallCheck(this, CommitsAction);
	    }

	    _createClass(CommitsAction, null, [{
	        key: 'startGetCommits',
	        value: function startGetCommits() {
	            return _common2.default.getAction('START_GET_COMMITS');
	        }
	    }, {
	        key: 'getCommits',
	        value: function getCommits(isUpdateTotalPage) {
	            var _this = this;

	            return function (dispatch, getState) {
	                dispatch(_this.startGetCommits());

	                var _getState = getState();

	                var repository = _getState.repository;
	                var pager = _getState.pager;
	                var filter = _getState.filter;var promise = void 0;
	                if (isUpdateTotalPage) {
	                    promise = _git2.default.getCommitsCount(repository.currentBranch, filter.users, filter.message, filter.fromDate, filter.toDate);
	                } else {
	                    promise = Promise.resolve(-1);
	                }
	                promise.then(function (count) {
	                    var current = pager.current;
	                    if (count > -1) {
	                        var total = Math.ceil(count / pager.size);
	                        if (current > total) current = total;
	                        dispatch(_pager2.default.updatePager({ current: current, total: total }));
	                    }
	                    return _git2.default.getCommits(current, pager.size, repository.currentBranch, filter.users, filter.message, filter.fromDate, filter.toDate);
	                }).then(function (commits) {
	                    dispatch(_this.endGetCommits(commits));
	                }).catch(function (err) {
	                    dispatch(_this.endGetCommits([]));
	                });
	            };
	        }
	    }, {
	        key: 'endGetCommits',
	        value: function endGetCommits(commits) {
	            return function (dispatch) {
	                dispatch(_selection2.default.deselectAll());
	                dispatch(_common2.default.getAction('END_GET_COMMITS', commits));
	            };
	        }
	    }]);

	    return CommitsAction;
	}();

	exports.default = CommitsAction;

/***/ },

/***/ 210:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _common = __webpack_require__(171);

	var _common2 = _interopRequireDefault(_common);

	var _commits = __webpack_require__(209);

	var _commits2 = _interopRequireDefault(_commits);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PagerAction = function () {
	    function PagerAction() {
	        _classCallCheck(this, PagerAction);
	    }

	    _createClass(PagerAction, null, [{
	        key: 'changePage',
	        value: function changePage(page) {
	            return function (dispatch) {
	                dispatch(_common2.default.getAction('CHANGE_PAGE', page));
	                dispatch(_commits2.default.getCommits());
	            };
	        }
	    }, {
	        key: 'changePageSize',
	        value: function changePageSize(size) {
	            return function (dispatch, getState) {
	                var _getState = getState();

	                var repository = _getState.repository;
	                var pager = _getState.pager;

	                if (size === pager.size) return;
	                dispatch(_common2.default.getAction('CHANGE_PAGE_SIZE', size));
	                dispatch(_commits2.default.getCommits(true));
	            };
	        }
	    }, {
	        key: 'updatePager',
	        value: function updatePager(newProps) {
	            return _common2.default.getAction('UPDATE_PAGER', newProps);
	        }
	    }]);

	    return PagerAction;
	}();

	exports.default = PagerAction;

/***/ },

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _common = __webpack_require__(171);

	var _common2 = _interopRequireDefault(_common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SelectionTab = function () {
		function SelectionTab() {
			_classCallCheck(this, SelectionTab);
		}

		_createClass(SelectionTab, null, [{
			key: 'toggleSelectAll',
			value: function toggleSelectAll() {
				return function (dispatch, getState) {
					var _getState = getState();

					var commits = _getState.commits;
					var selection = _getState.selection;

					var indexes = [],
					    isAll = false;
					if (!selection.isAll) {
						indexes = commits.data.map(function (commit, i) {
							return i;
						});
						isAll = true;
					}
					dispatch(_common2.default.getAction('UPDATE_SELECTION', { isAll: isAll, indexes: indexes }));
				};
			}
		}, {
			key: 'toggleSelect',
			value: function toggleSelect(index) {
				return function (dispatch, getState) {
					var _getState2 = getState();

					var commits = _getState2.commits;
					var selection = _getState2.selection;

					var indexes = [].concat(_toConsumableArray(selection.indexes)),
					    isAll = selection.isAll;
					var i = indexes.indexOf(index);
					if (i === -1) {
						indexes.push(index);
						if (commits.data.length === indexes.length) isAll = true;
					} else {
						indexes.splice(i, 1);
						if (isAll) isAll = false;
					}
					dispatch(_common2.default.getAction('UPDATE_SELECTION', { isAll: isAll, indexes: indexes }));
				};
			}
		}, {
			key: 'deselectAll',
			value: function deselectAll() {
				return _common2.default.getAction('UPDATE_SELECTION', {
					isAll: false,
					indexes: []
				});
			}
		}]);

		return SelectionTab;
	}();

	exports.default = SelectionTab;

/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _common = __webpack_require__(171);

	var _common2 = _interopRequireDefault(_common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ControlAction = function () {
		function ControlAction() {
			_classCallCheck(this, ControlAction);
		}

		_createClass(ControlAction, null, [{
			key: 'startAction',
			value: function startAction() {
				return _common2.default.getAction('CONTROL_START_ACTION');
			}
		}, {
			key: 'stopAction',
			value: function stopAction() {
				return _common2.default.getAction('CONTROL_STOP_ACTION');
			}
		}]);

		return ControlAction;
	}();

	exports.default = ControlAction;

/***/ },

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _common = __webpack_require__(171);

	var _common2 = _interopRequireDefault(_common);

	var _git = __webpack_require__(203);

	var _git2 = _interopRequireDefault(_git);

	var _commits = __webpack_require__(209);

	var _commits2 = _interopRequireDefault(_commits);

	var _pager = __webpack_require__(210);

	var _pager2 = _interopRequireDefault(_pager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FilterAction = function () {
	    function FilterAction() {
	        _classCallCheck(this, FilterAction);
	    }

	    _createClass(FilterAction, null, [{
	        key: 'toggleFilter',
	        value: function toggleFilter() {
	            return _common2.default.getAction('TOGGLE_FILTER');
	        }
	    }, {
	        key: 'updateFilter',
	        value: function updateFilter(newProps) {
	            return _common2.default.getAction('UPDATE_FILTER', newProps);
	        }
	    }, {
	        key: 'setUserInput',
	        value: function setUserInput(keyword) {
	            return function (dispatch, getState) {
	                var _getState = getState();

	                var filter = _getState.filter;

	                var key = keyword.toLowerCase();
	                var filteredUsers = filter.allUsers.filter(function (user) {
	                    var name = user.name.toLowerCase();
	                    var email = user.email.toLowerCase();
	                    if (name.indexOf(key) > -1 || email.indexOf(key) > -1) return true;
	                    return false;
	                });
	                dispatch(_common2.default.getAction('UPDATE_FILTER', {
	                    userInput: keyword,
	                    filteredUsers: filteredUsers
	                }));
	            };
	        }
	    }, {
	        key: 'setAllUsers',
	        value: function setAllUsers(allUsers) {
	            return _common2.default.getAction('SET_ALL_USERS', allUsers);
	        }
	    }, {
	        key: 'setUsers',
	        value: function setUsers(users) {
	            return _common2.default.getAction('SET_USERS', users);
	        }
	    }, {
	        key: 'setMessage',
	        value: function setMessage(message) {
	            return _common2.default.getAction('SET_MESSAGE', message);
	        }
	    }, {
	        key: 'setFromDate',
	        value: function setFromDate(fromDate) {
	            return _common2.default.getAction('SET_FROM_DATE', fromDate);
	        }
	    }, {
	        key: 'setToDate',
	        value: function setToDate(toDate) {
	            return _common2.default.getAction('SET_TO_DATE', toDate);
	        }
	    }, {
	        key: 'resetFilter',
	        value: function resetFilter() {
	            return _common2.default.getAction('RESET_FILTER');
	        }
	    }]);

	    return FilterAction;
	}();

	exports.default = FilterAction;

/***/ },

/***/ 214:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _common = __webpack_require__(171);

	var _common2 = _interopRequireDefault(_common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoadingAction = function () {
		function LoadingAction() {
			_classCallCheck(this, LoadingAction);
		}

		_createClass(LoadingAction, null, [{
			key: 'startLoading',
			value: function startLoading() {
				return _common2.default.getAction('START_LOADING');
			}
		}, {
			key: 'endLoading',
			value: function endLoading() {
				return _common2.default.getAction('END_LOADING');
			}
		}]);

		return LoadingAction;
	}();

	exports.default = LoadingAction;

/***/ },

/***/ 215:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _common = __webpack_require__(171);

	var _common2 = _interopRequireDefault(_common);

	var _git = __webpack_require__(203);

	var _git2 = _interopRequireDefault(_git);

	var _commits = __webpack_require__(209);

	var _commits2 = _interopRequireDefault(_commits);

	var _filter = __webpack_require__(213);

	var _filter2 = _interopRequireDefault(_filter);

	var _loading = __webpack_require__(214);

	var _loading2 = _interopRequireDefault(_loading);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PagerAction = function () {
	    function PagerAction() {
	        _classCallCheck(this, PagerAction);
	    }

	    _createClass(PagerAction, null, [{
	        key: 'fetchAll',
	        value: function fetchAll() {
	            var _this = this;

	            return function (dispatch) {
	                dispatch(_loading2.default.startLoading());
	                _git2.default.fetchAll().then(function () {
	                    dispatch(_this.getBranchInfo());
	                }).catch(function (err) {
	                    _common2.default.showErrorBox('Error', err);
	                    dispatch(_loading2.default.endLoading());
	                });
	            };
	        }
	    }, {
	        key: 'getBranchInfo',
	        value: function getBranchInfo() {
	            var _this2 = this;

	            return function (dispatch, getState) {
	                dispatch(_loading2.default.startLoading());
	                var promises = [];

	                var _getState = getState();

	                var repository = _getState.repository;

	                promises.push(_git2.default.getBranches());
	                promises.push(_git2.default.getUsers(repository.currentBranch));
	                promises.push(_git2.default.getCommitsCount(repository.currentBranch));
	                Promise.all(promises).then(function (values) {
	                    var repository = {
	                        branches: values[0],
	                        users: values[1],
	                        commitsCount: values[2]
	                    };
	                    dispatch(_this2.updateRepository(repository));
	                    dispatch(_loading2.default.endLoading());
	                }).catch(function (err) {
	                    _common2.default.showErrorBox('Error', err);
	                    dispatch(_loading2.default.endLoading());
	                });
	            };
	        }
	    }, {
	        key: 'updateRepository',
	        value: function updateRepository(repository) {
	            return _common2.default.getAction('UPDATE_REPOSITORY', repository);
	        }
	    }, {
	        key: 'changeBranch',
	        value: function changeBranch(newBranch) {
	            var _this3 = this;

	            return function (dispatch) {
	                dispatch(_common2.default.getAction('CHANGE_BRANCH', newBranch));
	                dispatch(_filter2.default.resetFilter());
	                dispatch(_this3.getBranchInfo());
	            };
	        }
	    }]);

	    return PagerAction;
	}();

	exports.default = PagerAction;

/***/ },

/***/ 216:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _common = __webpack_require__(171);

	var _common2 = _interopRequireDefault(_common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TabAction = function () {
		function TabAction() {
			_classCallCheck(this, TabAction);
		}

		_createClass(TabAction, null, [{
			key: 'changeTab',
			value: function changeTab(index) {
				return _common2.default.getAction('CHANGE_TAB', index);
			}
		}]);

		return TabAction;
	}();

	exports.default = TabAction;

/***/ },

/***/ 217:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Tab = exports.SelectType = exports.Select = exports.Pager = exports.Loader = exports.Button = undefined;

	var _button = __webpack_require__(218);

	var _button2 = _interopRequireDefault(_button);

	var _loader = __webpack_require__(219);

	var _loader2 = _interopRequireDefault(_loader);

	var _pager = __webpack_require__(220);

	var _pager2 = _interopRequireDefault(_pager);

	var _select = __webpack_require__(221);

	var _tab = __webpack_require__(227);

	var _tab2 = _interopRequireDefault(_tab);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Button = _button2.default;
	exports.Loader = _loader2.default;
	exports.Pager = _pager2.default;
	exports.Select = _select.Select;
	exports.SelectType = _select.SelectType;
	exports.Tab = _tab2.default;

/***/ },

/***/ 218:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (props) {
		var icon = null;
		if (props.iconClass) {
			icon = _react2.default.createElement('i', { className: 'icon ' + props.iconClass });
		}
		return _react2.default.createElement(
			'button',
			{ className: 'ui button ' + props.buttonClass, onClick: props.onClick },
			icon,
			' ',
			props.label
		);
	};

/***/ },

/***/ 219:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (props) {
		return _react2.default.createElement(
			"div",
			{ className: "ui active centered text inline large loader" },
			props.text
		);
	};

/***/ },

/***/ 220:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _select = __webpack_require__(221);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var Pager = function Pager(props) {
	    var current = parseInt(props.current);
	    var total = parseInt(props.total);
	    var key = 0;
	    if (current > total || current < 1 || total < 1) return null;
	    var getItem = function getItem(text, isDisabled, isActive, target) {
	        var className = 'item ';
	        if (isDisabled) className += 'disabled';else if (isActive) className += 'active';
	        if (isDisabled || isActive) {
	            return _react2.default.createElement(
	                'div',
	                { key: key++, className: className },
	                text
	            );
	        } else {
	            return _react2.default.createElement(
	                'a',
	                { key: key++, className: className, onClick: function onClick() {
	                        return props.changePage(target);
	                    } },
	                text
	            );
	        }
	    };
	    var changePageSize = function changePageSize(selected) {
	        return props.changePageSize(selected[0]);
	    };

	    var before = void 0,
	        after = void 0;

	    if (current === 1) {
	        before = [getItem(_react2.default.createElement('i', { className: 'left chevron icon' }), true, false)];
	    } else {
	        before = [getItem(_react2.default.createElement('i', { className: 'left chevron icon' }), false, false, current - 1)];
	    }
	    if (current > 4) {
	        before = [].concat(_toConsumableArray(before), [getItem(1, false, false, 1), getItem('...', true, false), getItem(current - 1, false, false, current - 1)]);
	    } else {
	        for (var i = 1; i < current; i++) {
	            before.push(getItem(i, false, false, i));
	        }
	    }

	    after = [getItem(current, false, true)];
	    if (total - current > 3) {
	        after = [].concat(_toConsumableArray(after), [getItem(current + 1, false, false, current + 1), getItem('...', true, false), getItem(total, false, false, total)]);
	    } else {
	        for (var _i = current + 1; _i <= total; _i++) {
	            after.push(getItem(_i, false, false, _i));
	        }
	    }
	    if (current === total) {
	        after.push(getItem(_react2.default.createElement('i', { className: 'right chevron icon' }), true, false));
	    } else {
	        after.push(getItem(_react2.default.createElement('i', { className: 'right chevron icon' }), false, false, current + 1));
	    }

	    return _react2.default.createElement(
	        'div',
	        { className: 'ui grid' },
	        _react2.default.createElement(
	            'div',
	            { className: 'ten wide column' },
	            _react2.default.createElement(
	                'div',
	                { className: 'ui pagination menu' },
	                [].concat(_toConsumableArray(before), _toConsumableArray(after))
	            )
	        ),
	        _react2.default.createElement(
	            'div',
	            { className: 'six wide right aligned column' },
	            _react2.default.createElement(
	                'label',
	                null,
	                'Show\xA0\xA0',
	                _react2.default.createElement(_select.Select, {
	                    options: props.sizes,
	                    stringOption: true,
	                    selectedOptions: [props.size],
	                    onChange: changePageSize }),
	                '\xA0\xA0items'
	            )
	        )
	    );
	};

	exports.default = Pager;


	Pager.propsType = {
	    current: _react2.default.PropTypes.number.isRequired,
	    total: _react2.default.PropTypes.number.isRequired,
	    size: _react2.default.PropTypes.number.isRequired,
	    sizes: _react2.default.PropTypes.array.isRequired,
	    changePage: _react2.default.PropTypes.func.isRequired,
	    changePageSize: _react2.default.PropTypes.func.isRequired
	};

/***/ },

/***/ 221:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SelectType = exports.Select = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(33);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactAddonsPureRenderMixin = __webpack_require__(222);

	var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

	var _selectList = __webpack_require__(225);

	var _selectList2 = _interopRequireDefault(_selectList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SelectType = Object.freeze({
	    NORMAL: 0,
	    BUTTON: 1,
	    INLINE: 2
	});

	var Select = function (_React$Component) {
	    _inherits(Select, _React$Component);

	    function Select(props) {
	        _classCallCheck(this, Select);

	        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

	        _this.props = props;
	        _this.state = { active: false };

	        _this.getClass = _this.getClass.bind(_this);
	        _this.renderSelected = _this.renderSelected.bind(_this);
	        _this.renderInputText = _this.renderInputText.bind(_this);
	        _this.renderInputSizer = _this.renderInputSizer.bind(_this);
	        _this.renderSelectList = _this.renderSelectList.bind(_this);
	        _this.inputChange = _this.inputChange.bind(_this);
	        _this.onSelect = _this.onSelect.bind(_this);
	        _this.onDeselect = _this.onDeselect.bind(_this);
	        _this.showDropdown = _this.showDropdown.bind(_this);
	        _this.hideDropdown = _this.hideDropdown.bind(_this);
	        _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
	        return _this;
	    }

	    _createClass(Select, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: this.getClass(), onClick: this.showDropdown },
	                this.renderSelected(),
	                this.renderInputText(),
	                this.renderInputSizer(),
	                this.renderIcon(),
	                this.renderSelectList()
	            );
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            window.addEventListener('click', this.hideDropdown, false);
	            if (this.props.search) {
	                this.inputText = _reactDom2.default.findDOMNode(this.refs.inputText);
	                if (this.props.multiple) {
	                    this.inputSizer = _reactDom2.default.findDOMNode(this.refs.inputSizer);
	                }
	            }
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            window.removeEventListener('click', this.hideDropdown, false);
	        }
	    }, {
	        key: 'getClass',
	        value: function getClass() {
	            var _props = this.props;
	            var type = _props.type;
	            var search = _props.search;
	            var multiple = _props.multiple;

	            var className = 'ui dropdown glv-dropdown ';
	            if (this.state.active) className += 'active visible ';
	            if (type === SelectType.NORMAL) {
	                className += 'selection ';
	                if (search) className += 'search ';
	                if (multiple) className += 'fluid multiple ';
	            } else if (type === SelectType.BUTTON) {
	                className += 'button scrolling ';
	            } else if (type === SelectType.INLINE) {
	                className += 'inline scrolling ';
	            }
	            return className;
	        }
	    }, {
	        key: 'renderSelected',
	        value: function renderSelected() {
	            var _this2 = this;

	            var _props2 = this.props;
	            var selectedOptions = _props2.selectedOptions;
	            var placeHolder = _props2.placeHolder;
	            var multiple = _props2.multiple;
	            var stringOption = _props2.stringOption;
	            var selectedAttr = _props2.selectedAttr;
	            var valueAttr = _props2.valueAttr;

	            if (selectedOptions.length === 0) {
	                return _react2.default.createElement(
	                    'div',
	                    { className: 'text default', ref: 'placeHolder' },
	                    placeHolder
	                );
	            } else if (!multiple) {
	                var option = selectedOptions[0];
	                if (!stringOption) {
	                    option = option[selectedAttr];
	                }
	                return _react2.default.createElement(
	                    'div',
	                    { className: 'text' },
	                    option
	                );
	            } else if (!stringOption) {
	                return selectedOptions.map(function (option, i) {
	                    return _react2.default.createElement(
	                        'a',
	                        { key: option[valueAttr], className: 'ui label', onClick: function onClick(e) {
	                                return _this2.onDeselect(e, i);
	                            } },
	                        option[selectedAttr],
	                        _react2.default.createElement('i', { className: 'delete icon' })
	                    );
	                });
	            } else {
	                return selectedOptions.map(function (option, i) {
	                    return _react2.default.createElement(
	                        'a',
	                        { key: i, className: 'ui label', onClick: function onClick(e) {
	                                return _this2.onDeselect(e, i);
	                            } },
	                        option,
	                        _react2.default.createElement('i', { className: 'delete icon' })
	                    );
	                });
	            }
	        }
	    }, {
	        key: 'renderInputText',
	        value: function renderInputText() {
	            if (!this.props.search) return null;
	            return _react2.default.createElement('input', { className: 'search', autoComplete: 'off', onChange: this.inputChange, ref: 'inputText' });
	        }
	    }, {
	        key: 'renderInputSizer',
	        value: function renderInputSizer() {
	            if (!this.props.search || !this.props.multiple) return null;
	            return _react2.default.createElement('span', { className: 'sizer glv-sizer', ref: 'inputSizer' });
	        }
	    }, {
	        key: 'renderIcon',
	        value: function renderIcon() {
	            return _react2.default.createElement('i', { className: 'dropdown icon' });
	        }
	    }, {
	        key: 'renderSelectList',
	        value: function renderSelectList() {
	            var _props3 = this.props;
	            var options = _props3.options;
	            var selectedOptions = _props3.selectedOptions;
	            var stringOption = _props3.stringOption;
	            var valueAttr = _props3.valueAttr;
	            var optionAttr = _props3.optionAttr;

	            if (!this.state.active) return null;
	            return _react2.default.createElement(_selectList2.default, {
	                options: options,
	                selectedOptions: selectedOptions,
	                stringOption: stringOption,
	                onSelect: this.onSelect,
	                valueAttr: valueAttr,
	                optionAttr: optionAttr });
	        }
	    }, {
	        key: 'inputChange',
	        value: function inputChange() {
	            var _props4 = this.props;
	            var selectedOptions = _props4.selectedOptions;
	            var placeHolder = _props4.placeHolder;
	            var multiple = _props4.multiple;
	            var onInputChange = _props4.onInputChange;

	            var keyword = this.inputText.value;
	            if (selectedOptions.length === 0) {
	                var placeHolderDiv = _reactDom2.default.findDOMNode(this.refs.placeHolder);
	                if (keyword.length === 0) {
	                    placeHolderDiv.innerHTML = placeHolder;
	                } else {
	                    placeHolderDiv.innerHTML = '';
	                }
	            }
	            if (multiple) {
	                // Change the size of input element based on input text
	                this.inputSizer.innerHTML = keyword.replace(/\s/g, '&nbsp;');
	                this.inputText.style = 'width: ' + this.inputSizer.offsetWidth + 'px';
	            }
	            onInputChange(keyword);
	        }
	    }, {
	        key: 'onSelect',
	        value: function onSelect(option, selected) {
	            var _props5 = this.props;
	            var search = _props5.search;
	            var multiple = _props5.multiple;
	            var onChange = _props5.onChange;

	            var selectedOptions = [].concat(_toConsumableArray(this.props.selectedOptions));

	            if (search) {
	                this.inputText.value = '';
	                this.inputChange();
	            }
	            if (selected) return this.setState({ active: false });
	            if (multiple || selectedOptions.length === 0) {
	                selectedOptions.push(option);
	            } else {
	                selectedOptions[0] = option;
	            }
	            this.setState({ active: false });
	            onChange(selectedOptions);
	        }
	    }, {
	        key: 'onDeselect',
	        value: function onDeselect(e, i) {
	            e.stopPropagation();
	            this.inputText.value = '';
	            this.inputChange();
	            var selectedOptions = [].concat(_toConsumableArray(this.props.selectedOptions));
	            selectedOptions.splice(i, 1);
	            var onChange = this.props.onChange;

	            onChange(selectedOptions);
	        }
	    }, {
	        key: 'showDropdown',
	        value: function showDropdown(e) {
	            e.stopPropagation();
	            if (this.props.search) {
	                this.inputText.focus();
	            }
	            this.setState({ active: true });
	        }
	    }, {
	        key: 'hideDropdown',
	        value: function hideDropdown() {
	            this.setState({ active: false });
	        }
	    }]);

	    return Select;
	}(_react2.default.Component);

	Select.defaultProps = {
	    selectedOptions: [],
	    type: SelectType.NORMAL,
	    search: false,
	    multiple: false,
	    stringOption: false,
	    valueAttr: 'value',
	    optionAttr: 'text',
	    selectedAttr: 'text',
	    placeHolder: 'Choose an option'
	};

	Select.propTypes = {
	    options: _react2.default.PropTypes.array.isRequired,
	    selectedOptions: _react2.default.PropTypes.array,
	    type: _react2.default.PropTypes.number,
	    search: _react2.default.PropTypes.bool,
	    multiple: _react2.default.PropTypes.bool,
	    stringOption: _react2.default.PropTypes.bool,
	    valueAttr: _react2.default.PropTypes.string,
	    optionAttr: _react2.default.PropTypes.string,
	    selectedAttr: _react2.default.PropTypes.string,
	    placeHolder: _react2.default.PropTypes.string,
	    onInputChange: _react2.default.PropTypes.func,
	    onChange: _react2.default.PropTypes.func.isRequired
	};

	exports.Select = Select;
	exports.SelectType = SelectType;

/***/ },

/***/ 225:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _selectListItem = __webpack_require__(226);

	var _selectListItem2 = _interopRequireDefault(_selectListItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SelectList = function SelectList(props) {
	    if (props.options.length === 0) return null;
	    var items = props.options.map(function (option) {
	        var display = void 0,
	            key = void 0,
	            idx = void 0,
	            selected = false;
	        if (props.stringOption) {
	            display = option;
	            key = option;
	            idx = props.selectedOptions.findIndex(function (opt) {
	                if (opt === option) return true;
	            });
	        } else {
	            display = option[props.optionAttr];
	            key = option[props.valueAttr];
	            idx = props.selectedOptions.findIndex(function (opt) {
	                if (opt[props.valueAttr] === key) return true;
	            });
	        }
	        if (idx !== -1) selected = true;
	        return _react2.default.createElement(_selectListItem2.default, {
	            key: key,
	            selected: selected,
	            option: option,
	            display: display,
	            onClick: props.onSelect });
	    });
	    return _react2.default.createElement(
	        'div',
	        { className: 'menu transition visible', tabIndex: '-1' },
	        items
	    );
	};

	exports.default = SelectList;


	SelectList.defaultProps = {
	    stringOption: false
	};

	SelectList.propsType = {
	    options: _react2.default.PropTypes.array.isRequired,
	    selectedOptions: _react2.default.PropTypes.array.isRequired,
	    stringOption: _react2.default.PropTypes.bool,
	    valueAttr: _react2.default.PropTypes.string,
	    optionAttr: _react2.default.PropTypes.string,
	    onSelect: _react2.default.PropTypes.func.isRequired
	};

/***/ },

/***/ 226:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SelectListItem = function SelectListItem(props) {
		var className = 'item ';
		if (props.selected) className += 'selected';
		var onClick = function onClick(e) {
			e.stopPropagation();
			props.onClick(props.option, props.selected);
		};
		return _react2.default.createElement(
			'div',
			{ className: className, onClick: onClick },
			props.display
		);
	};

	exports.default = SelectListItem;


	SelectListItem.defaultProps = {
		selected: false
	};

	SelectListItem.propsType = {
		option: _react2.default.PropTypes.any.isRequired,
		display: _react2.default.PropTypes.any.isRequired,
		selected: _react2.default.PropTypes.bool
	};

/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Tab = function Tab(props) {
		if (!props.data) return null;
		var buttons = [],
		    contents = [];

		var _loop = function _loop(i) {
			var tab = props.data[i];
			var className = props.active === i ? 'active' : '';
			buttons.push(_react2.default.createElement(
				'a',
				{ key: 'button' + i, className: 'item ' + className, onClick: function onClick() {
						return props.changeTab(i);
					} },
				tab.name
			));
			contents.push(_react2.default.createElement(
				'div',
				{ key: 'content' + i, className: 'ui bottom attached tab segment ' + className },
				tab.component
			));
		};

		for (var i = 0; i < props.data.length; i++) {
			_loop(i);
		}
		return _react2.default.createElement(
			'div',
			{ className: 'glv-margin-top' },
			_react2.default.createElement(
				'div',
				{ className: 'ui top attached tabular menu' },
				buttons
			),
			contents
		);
	};

	Tab.defaultProps = {
		active: 0
	};

	exports.default = Tab;

/***/ },

/***/ 228:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(193);

	var _app = __webpack_require__(174);

	var _app2 = _interopRequireDefault(_app);

	var _common = __webpack_require__(217);

	var _commitsControl = __webpack_require__(229);

	var _commitsControl2 = _interopRequireDefault(_commitsControl);

	var _commitsFilter = __webpack_require__(230);

	var _commitsFilter2 = _interopRequireDefault(_commitsFilter);

	var _commitsList = __webpack_require__(231);

	var _commitsList2 = _interopRequireDefault(_commitsList);

	var _actions = __webpack_require__(208);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Commits = function (_React$Component) {
	    _inherits(Commits, _React$Component);

	    function Commits(props) {
	        _classCallCheck(this, Commits);

	        var _this = _possibleConstructorReturn(this, (Commits.__proto__ || Object.getPrototypeOf(Commits)).call(this, props));

	        _this.props = props;
	        _this.changePage = _this.changePage.bind(_this);
	        _this.changePageSize = _this.changePageSize.bind(_this);
	        return _this;
	    }

	    _createClass(Commits, [{
	        key: 'render',
	        value: function render() {
	            var pager = this.props.pager;

	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(_common.Pager, {
	                    current: pager.current,
	                    total: pager.total,
	                    size: pager.size,
	                    sizes: _app2.default.PAGER_SIZE_AVAIABLE,
	                    changePage: this.changePage,
	                    changePageSize: this.changePageSize }),
	                _react2.default.createElement(_commitsControl2.default, null),
	                _react2.default.createElement(_commitsFilter2.default, null),
	                _react2.default.createElement(_commitsList2.default, null)
	            );
	        }
	    }, {
	        key: 'changePage',
	        value: function changePage(page) {
	            this.props.changePage(page);
	        }
	    }, {
	        key: 'changePageSize',
	        value: function changePageSize(size) {
	            this.props.changePageSize(size);
	        }
	    }]);

	    return Commits;
	}(_react2.default.Component);

	var mapStateToProps = function mapStateToProps(state) {
	    return {
	        pager: state.pager,
	        commits: state.commits
	    };
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        changePage: function changePage(page) {
	            return dispatch(_actions.PagerAction.changePage(page));
	        },
	        changePageSize: function changePageSize(size) {
	            return dispatch(_actions.PagerAction.changePageSize(size));
	        }
	    };
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Commits);

/***/ },

/***/ 229:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(193);

	var _electron = __webpack_require__(173);

	var _app = __webpack_require__(174);

	var _app2 = _interopRequireDefault(_app);

	var _git = __webpack_require__(203);

	var _git2 = _interopRequireDefault(_git);

	var _common = __webpack_require__(217);

	var _actions = __webpack_require__(208);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var actions = [{ text: "Export selected commits", value: 1 }, { text: "Create Merge diff report from selected", value: 2 }];

	var CommitsControl = function (_React$Component) {
		_inherits(CommitsControl, _React$Component);

		function CommitsControl(props) {
			_classCallCheck(this, CommitsControl);

			var _this = _possibleConstructorReturn(this, (CommitsControl.__proto__ || Object.getPrototypeOf(CommitsControl)).call(this, props));

			_this.props = props;
			_this.renderAction = _this.renderAction.bind(_this);
			_this.renderLoader = _this.renderLoader.bind(_this);
			_this.doAction = _this.doAction.bind(_this);
			return _this;
		}

		_createClass(CommitsControl, [{
			key: 'render',
			value: function render() {
				var _props = this.props;
				var filter = _props.filter;
				var selection = _props.selection;
				var toggleFilter = _props.toggleFilter;
				var toggleSelectAll = _props.toggleSelectAll;

				var filterBtn = filter.active ? 'Hide filter' : 'Show filter';
				var selectBtn = selection.isAll ? 'Deselect All' : 'Select All';
				return _react2.default.createElement(
					'div',
					{ className: 'glv-margin-top' },
					_react2.default.createElement(_common.Button, {
						buttonClass: 'basic',
						iconClass: 'filter left',
						label: filterBtn,
						onClick: toggleFilter }),
					_react2.default.createElement(_common.Button, {
						buttonClass: 'basic',
						label: selectBtn,
						onClick: toggleSelectAll }),
					this.renderAction(),
					this.renderLoader()
				);
			}
		}, {
			key: 'renderAction',
			value: function renderAction() {
				var selection = this.props.selection;

				if (selection.indexes.length === 0) return null;
				return _react2.default.createElement(_common.Select, {
					type: _common.SelectType.BUTTON,
					options: actions,
					placeHolder: 'Choose an action',
					onChange: this.doAction });
			}
		}, {
			key: 'renderLoader',
			value: function renderLoader() {
				if (!this.props.control.loading) return null;
				return _react2.default.createElement('div', { className: 'ui active inline small loader' });
			}
		}, {
			key: 'doAction',
			value: function doAction(opts) {
				var type = opts[0].value;
				var _props2 = this.props;
				var commits = _props2.commits;
				var control = _props2.control;
				var repository = _props2.repository;
				var selection = _props2.selection;
				var startAction = _props2.startAction;
				var stopAction = _props2.stopAction;

				var selectedCommits = [];
				for (var i = 0; i < commits.data.length; i++) {
					if (selection.indexes.indexOf(i) > -1) selectedCommits.push(commits.data[i]);
				}
				if (type === 1) {
					_electron.ipcRenderer.send(_app2.default.CHANNEL_COMMITS_REPORT, selectedCommits);
				} else if (type === 2) {
					var data = {
						repository: repository,
						commits: selectedCommits
					};
					_electron.ipcRenderer.send(_app2.default.CHANNEL_MERGE_DIFF_REPORT, data);
				}
			}
		}]);

		return CommitsControl;
	}(_react2.default.Component);

	var mapStateToProps = function mapStateToProps(state) {
		return {
			commits: state.commits,
			control: state.control,
			filter: state.filter,
			repository: state.repository,
			selection: state.selection
		};
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
		return {
			startAction: function startAction() {
				return dispatch(_actions.ControlAction.startAction());
			},
			stopAction: function stopAction() {
				return dispatch(_actions.ControlAction.stopAction());
			},
			toggleFilter: function toggleFilter() {
				return dispatch(_actions.FilterAction.toggleFilter());
			},
			toggleSelectAll: function toggleSelectAll() {
				return dispatch(_actions.SelectionAction.toggleSelectAll());
			}
		};
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CommitsControl);

/***/ },

/***/ 230:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(33);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRedux = __webpack_require__(193);

	var _common = __webpack_require__(217);

	var _actions = __webpack_require__(208);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CommitsFilter = function (_React$Component) {
	    _inherits(CommitsFilter, _React$Component);

	    function CommitsFilter(props) {
	        _classCallCheck(this, CommitsFilter);

	        var _this = _possibleConstructorReturn(this, (CommitsFilter.__proto__ || Object.getPrototypeOf(CommitsFilter)).call(this, props));

	        _this.props = props;
	        return _this;
	    }

	    _createClass(CommitsFilter, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var active = _props.active;
	            var filter = _props.filter;
	            var repository = _props.repository;
	            var setUserInput = _props.setUserInput;
	            var setUsers = _props.setUsers;
	            var setMessage = _props.setMessage;
	            var setFromDate = _props.setFromDate;
	            var setToDate = _props.setToDate;
	            var search = _props.search;
	            var reset = _props.reset;

	            if (!filter.active) return null;

	            return _react2.default.createElement(
	                'div',
	                { className: 'ui form glv-margin-top' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'fields' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'sixteen wide field' },
	                        _react2.default.createElement(
	                            'label',
	                            null,
	                            'Users'
	                        ),
	                        _react2.default.createElement(_common.Select, {
	                            active: active,
	                            options: filter.filteredUsers,
	                            selectedOptions: filter.users,
	                            valueAttr: 'email',
	                            optionAttr: 'disp',
	                            selectedAttr: 'name',
	                            multiple: true,
	                            search: true,
	                            placeHolder: 'Select users',
	                            onChange: setUsers,
	                            onInputChange: setUserInput })
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'fields' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'ten wide field' },
	                        _react2.default.createElement(
	                            'label',
	                            null,
	                            'Commit message'
	                        ),
	                        _react2.default.createElement('input', { type: 'text', value: filter.message, onChange: setMessage, placeholder: 'Message' })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'three wide field' },
	                        _react2.default.createElement(
	                            'label',
	                            null,
	                            'From date'
	                        ),
	                        _react2.default.createElement('input', { type: 'date', value: filter.fromDate, onChange: setFromDate, placeholder: 'From' })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'three wide field' },
	                        _react2.default.createElement(
	                            'label',
	                            null,
	                            'To date'
	                        ),
	                        _react2.default.createElement('input', { type: 'date', value: filter.toDate, onChange: setToDate, placeholder: 'To' })
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'fields' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'field' },
	                        _react2.default.createElement(
	                            'button',
	                            { className: 'ui blue button', onClick: search },
	                            _react2.default.createElement('i', { className: 'search icon' }),
	                            ' Search'
	                        ),
	                        _react2.default.createElement(
	                            'button',
	                            { className: 'ui button', onClick: reset },
	                            _react2.default.createElement('i', { className: 'undo icon' }),
	                            ' Reset'
	                        )
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            var _props2 = this.props;
	            var repository = _props2.repository;
	            var updateFilter = _props2.updateFilter;

	            var users = repository.users.map(function (user) {
	                return Object.assign({}, user, {
	                    disp: _react2.default.createElement(
	                        'div',
	                        null,
	                        _react2.default.createElement(
	                            'strong',
	                            null,
	                            user.name
	                        ),
	                        _react2.default.createElement('br', null),
	                        user.email
	                    )
	                });
	            });
	            updateFilter({
	                allUsers: users,
	                filteredUsers: users
	            });
	        }
	    }]);

	    return CommitsFilter;
	}(_react2.default.Component);

	var mapStateToProps = function mapStateToProps(state) {
	    return {
	        filter: state.filter,
	        repository: state.repository
	    };
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        updateFilter: function updateFilter(filter) {
	            return dispatch(_actions.FilterAction.updateFilter(filter));
	        },
	        setUserInput: function setUserInput(keyword) {
	            return dispatch(_actions.FilterAction.setUserInput(keyword));
	        },
	        setUsers: function setUsers(users) {
	            return dispatch(_actions.FilterAction.setUsers(users));
	        },
	        setMessage: function setMessage(e) {
	            return dispatch(_actions.FilterAction.setMessage(e.target.value));
	        },
	        setFromDate: function setFromDate(e) {
	            return dispatch(_actions.FilterAction.setFromDate(e.target.value));
	        },
	        setToDate: function setToDate(e) {
	            return dispatch(_actions.FilterAction.setToDate(e.target.value));
	        },
	        search: function search() {
	            return dispatch(_actions.CommitsAction.getCommits(true));
	        },
	        reset: function reset() {
	            dispatch(_actions.FilterAction.resetFilter());
	            dispatch(_actions.CommitsAction.getCommits(true));
	        }
	    };
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CommitsFilter);

/***/ },

/***/ 231:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(193);

	var _common = __webpack_require__(217);

	var _commitsListItem = __webpack_require__(232);

	var _commitsListItem2 = _interopRequireDefault(_commitsListItem);

	var _actions = __webpack_require__(208);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CommitsList = function (_React$Component) {
	    _inherits(CommitsList, _React$Component);

	    function CommitsList(props) {
	        _classCallCheck(this, CommitsList);

	        var _this = _possibleConstructorReturn(this, (CommitsList.__proto__ || Object.getPrototypeOf(CommitsList)).call(this, props));

	        _this.props = props;
	        return _this;
	    }

	    _createClass(CommitsList, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var commits = _props.commits;
	            var selection = _props.selection;
	            var toggleSelect = _props.toggleSelect;

	            if (commits.loading) {
	                return _react2.default.createElement(_common.Loader, { text: 'Getting Commit Logs' });
	            } else {
	                var items = commits.data.map(function (commit, i) {
	                    var checked = false;
	                    if (selection.indexes.indexOf(i) > -1) checked = true;
	                    return _react2.default.createElement(_commitsListItem2.default, {
	                        key: commit.hash,
	                        commit: commit,
	                        checked: checked,
	                        onChange: function onChange() {
	                            return toggleSelect(i);
	                        } });
	                });
	                return _react2.default.createElement(
	                    'div',
	                    { className: 'ui vertically divided grid glv-margin-top' },
	                    items
	                );
	            }
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.props.getCommits();
	        }
	    }]);

	    return CommitsList;
	}(_react2.default.Component);

	var mapStateToProps = function mapStateToProps(state) {
	    return {
	        commits: state.commits,
	        selection: state.selection
	    };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        getCommits: function getCommits() {
	            return dispatch(_actions.CommitsAction.getCommits(true));
	        },
	        toggleSelect: function toggleSelect(i) {
	            return dispatch(_actions.SelectionAction.toggleSelect(i));
	        }
	    };
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CommitsList);

/***/ },

/***/ 232:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _git = __webpack_require__(203);

	var _git2 = _interopRequireDefault(_git);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CommitsItem = function (_React$Component) {
	    _inherits(CommitsItem, _React$Component);

	    function CommitsItem(props) {
	        _classCallCheck(this, CommitsItem);

	        var _this = _possibleConstructorReturn(this, (CommitsItem.__proto__ || Object.getPrototypeOf(CommitsItem)).call(this, props));

	        _this.props = props;
	        _this.state = {
	            loading: false,
	            expanded: false,
	            files: null
	        };
	        return _this;
	    }

	    _createClass(CommitsItem, [{
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var _props = this.props;
	            var commit = _props.commit;
	            var checked = _props.checked;
	            var onChange = _props.onChange;
	            var _state = this.state;
	            var loading = _state.loading;
	            var expanded = _state.expanded;
	            var files = _state.files;

	            if (commit === null) return null;
	            var loadingClass = loading ? ' loading' : '';
	            var detail = null;
	            if (expanded && files) {
	                var lis = files.map(function (file, i) {
	                    return _react2.default.createElement(
	                        'li',
	                        { key: i },
	                        file.filePath
	                    );
	                });
	                detail = _react2.default.createElement(
	                    'div',
	                    { className: 'ui grid glv-grid' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'column' },
	                        _react2.default.createElement(
	                            'ul',
	                            null,
	                            _react2.default.createElement(
	                                'li',
	                                null,
	                                _react2.default.createElement(
	                                    'strong',
	                                    null,
	                                    'Hash:'
	                                ),
	                                ' ',
	                                commit.hash
	                            ),
	                            _react2.default.createElement(
	                                'li',
	                                null,
	                                _react2.default.createElement(
	                                    'strong',
	                                    null,
	                                    'Files:'
	                                ),
	                                _react2.default.createElement(
	                                    'ul',
	                                    null,
	                                    lis
	                                )
	                            )
	                        )
	                    )
	                );
	            }
	            return _react2.default.createElement(
	                'div',
	                { className: 'row glv-row' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'column glv-column' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'ui two column grid glv-grid' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'twelve wide column glv-column' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'ui label' },
	                                _react2.default.createElement('i', { className: 'user icon' }),
	                                ' ',
	                                commit.username
	                            ),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'ui label' },
	                                _react2.default.createElement('i', { className: 'mail icon' }),
	                                ' ',
	                                commit.email
	                            ),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'ui label' },
	                                _react2.default.createElement('i', { className: 'wait icon' }),
	                                ' ',
	                                commit.date
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'right aligned four wide column glv-column' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'ui checkbox' },
	                                _react2.default.createElement('input', { type: 'checkbox', checked: checked, onChange: onChange }),
	                                _react2.default.createElement('label', null)
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'ui two column grid glv-grid' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'twelve wide column glv-column' },
	                            _react2.default.createElement(
	                                'p',
	                                { className: 'glv-commit-msg' },
	                                commit.message
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'right aligned four wide column glv-column glv-column-btn' },
	                            _react2.default.createElement(
	                                'button',
	                                { className: 'tiny ui button' + loadingClass, onClick: function onClick() {
	                                        _this2.toggle();
	                                    } },
	                                expanded ? 'Less' : 'More'
	                            )
	                        )
	                    ),
	                    detail
	                )
	            );
	        }
	    }, {
	        key: 'toggle',
	        value: function toggle() {
	            var _this3 = this;

	            var _state2 = this.state;
	            var loading = _state2.loading;
	            var expanded = _state2.expanded;
	            var files = _state2.files;

	            if (loading) return;
	            if (expanded) return this.setState({ expanded: false, loading: false });
	            if (files !== null) return this.setState({ expanded: true });

	            this.setState({ loading: true });
	            _git2.default.getFilesByCommitHash(this.props.commit.hash).then(function (files) {
	                _this3.setState({ loading: false, expanded: true, files: files });
	            }).catch(function (err) {
	                _this3.setState({ loading: false });
	            });
	        }
	    }]);

	    return CommitsItem;
	}(_react2.default.Component);

	exports.default = CommitsItem;

/***/ },

/***/ 233:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(193);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Information = function (_React$Component) {
	    _inherits(Information, _React$Component);

	    function Information(props) {
	        _classCallCheck(this, Information);

	        var _this = _possibleConstructorReturn(this, (Information.__proto__ || Object.getPrototypeOf(Information)).call(this, props));

	        _this.props = props;
	        return _this;
	    }

	    _createClass(Information, [{
	        key: 'render',
	        value: function render() {
	            var repository = this.props.repository;
	            var branches = [];
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = repository.branches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var branch = _step.value;

	                    if (branch.substring(0, 7) === 'remotes') {
	                        branches.push(_react2.default.createElement(
	                            'tr',
	                            { key: branch },
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'ui orange horizontal small label' },
	                                    'Remote'
	                                ),
	                                ' ',
	                                branch
	                            )
	                        ));
	                    } else {
	                        branches.push(_react2.default.createElement(
	                            'tr',
	                            { key: branch },
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'ui teal horizontal small label' },
	                                    'Local'
	                                ),
	                                ' ',
	                                branch
	                            )
	                        ));
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            var users = repository.users.map(function (user) {
	                return _react2.default.createElement(
	                    'tr',
	                    { key: user.email },
	                    _react2.default.createElement(
	                        'td',
	                        null,
	                        _react2.default.createElement('i', { className: 'icon user' }),
	                        ' ',
	                        user.name
	                    ),
	                    _react2.default.createElement(
	                        'td',
	                        null,
	                        _react2.default.createElement('i', { className: 'icon mail' }),
	                        ' ',
	                        user.email
	                    )
	                );
	            });
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'h3',
	                    null,
	                    '1. General Information'
	                ),
	                _react2.default.createElement(
	                    'ul',
	                    null,
	                    _react2.default.createElement(
	                        'li',
	                        null,
	                        'URL: ',
	                        repository.url
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        null,
	                        'Current branch: ',
	                        repository.currentBranch
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        null,
	                        'Commits: ',
	                        repository.commitsCount
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        null,
	                        'Contributors: ',
	                        repository.users.length
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        null,
	                        'Branches: ',
	                        repository.branches.length
	                    )
	                ),
	                _react2.default.createElement(
	                    'h3',
	                    null,
	                    '2. List contributors (of current branch)'
	                ),
	                _react2.default.createElement(
	                    'table',
	                    { className: 'ui very basic compact collapsing table' },
	                    _react2.default.createElement(
	                        'thead',
	                        null,
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'th',
	                                null,
	                                'Name'
	                            ),
	                            _react2.default.createElement(
	                                'th',
	                                null,
	                                'Email'
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'tbody',
	                        null,
	                        users
	                    )
	                ),
	                _react2.default.createElement(
	                    'h3',
	                    null,
	                    '3. All branches'
	                ),
	                _react2.default.createElement(
	                    'table',
	                    { className: 'ui very basic compact collapsing table' },
	                    _react2.default.createElement(
	                        'tbody',
	                        null,
	                        branches
	                    )
	                )
	            );
	        }
	    }]);

	    return Information;
	}(_react2.default.Component);

	var mapStateToProps = function mapStateToProps(state) {
	    return {
	        repository: state.repository
	    };
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Information);

/***/ },

/***/ 234:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _reduxSeamlessImmutable = __webpack_require__(235);

	var _commits = __webpack_require__(244);

	var _commits2 = _interopRequireDefault(_commits);

	var _control = __webpack_require__(245);

	var _control2 = _interopRequireDefault(_control);

	var _filter = __webpack_require__(246);

	var _filter2 = _interopRequireDefault(_filter);

	var _loading = __webpack_require__(247);

	var _loading2 = _interopRequireDefault(_loading);

	var _pager = __webpack_require__(248);

	var _pager2 = _interopRequireDefault(_pager);

	var _repository = __webpack_require__(249);

	var _repository2 = _interopRequireDefault(_repository);

	var _selection = __webpack_require__(250);

	var _selection2 = _interopRequireDefault(_selection);

	var _tab = __webpack_require__(251);

	var _tab2 = _interopRequireDefault(_tab);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _reduxSeamlessImmutable.combineReducers)({ commits: _commits2.default, control: _control2.default, loading: _loading2.default, filter: _filter2.default, pager: _pager2.default, repository: _repository2.default, selection: _selection2.default, tab: _tab2.default });

/***/ },

/***/ 244:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _actiontype = __webpack_require__(175);

	var _actiontype2 = _interopRequireDefault(_actiontype);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { loading: true, data: [] };
	    var action = arguments[1];

	    var newStateProp = void 0;
	    switch (action.type) {
	        case _actiontype2.default.START_GET_COMMITS:
	            return state.set('loading', true);
	        case _actiontype2.default.END_GET_COMMITS:
	            return state.merge({
	                loading: false,
	                data: action.data
	            });
	        default:
	            return state;
	    }
	};

/***/ },

/***/ 245:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _actiontype = __webpack_require__(175);

	var _actiontype2 = _interopRequireDefault(_actiontype);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var initState = {
	    loading: false
	};

	exports.default = function () {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
	    var action = arguments[1];

	    switch (action.type) {
	        case _actiontype2.default.CONTROL_START_ACTION:
	            return state.set('loading', true);
	        case _actiontype2.default.CONTROL_STOP_ACTION:
	            return state.set('loading', false);
	        default:
	            return state;
	    }
	};

/***/ },

/***/ 246:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _actiontype = __webpack_require__(175);

	var _actiontype2 = _interopRequireDefault(_actiontype);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var initState = {
	    active: false,
	    userInput: '', // Store the keyword when search for user
	    allUsers: [],
	    filteredUsers: [],
	    users: [],
	    message: '',
	    fromDate: '',
	    toDate: ''
	};

	exports.default = function () {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
	    var action = arguments[1];

	    switch (action.type) {
	        case _actiontype2.default.TOGGLE_FILTER:
	            return state.set('active', !state.active);
	        case _actiontype2.default.UPDATE_FILTER:
	            return state.merge(action.data);
	        case _actiontype2.default.SET_ALL_USERS:
	            return state.set('allUsers', action.data);
	        case _actiontype2.default.SET_USERS:
	            return state.set('users', action.data);
	        case _actiontype2.default.SET_MESSAGE:
	            return state.set('message', action.data);
	        case _actiontype2.default.SET_FROM_DATE:
	            return state.set('fromDate', action.data);
	        case _actiontype2.default.SET_TO_DATE:
	            return state.set('toDate', action.data);
	        case _actiontype2.default.RESET_FILTER:
	            return state.merge({
	                userInput: '',
	                users: [],
	                message: '',
	                fromDate: '',
	                toDate: ''
	            });
	        default:
	            return state;
	    }
	};

/***/ },

/***/ 247:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _actiontype = __webpack_require__(175);

	var _actiontype2 = _interopRequireDefault(_actiontype);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	    var action = arguments[1];

	    var newStateProp = void 0;
	    switch (action.type) {
	        case _actiontype2.default.START_LOADING:
	            return true;
	        case _actiontype2.default.END_LOADING:
	            return false;
	        default:
	            return state;
	    }
	};

/***/ },

/***/ 248:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _actiontype = __webpack_require__(175);

	var _actiontype2 = _interopRequireDefault(_actiontype);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    var newStateProp = void 0;
	    switch (action.type) {
	        case _actiontype2.default.CHANGE_PAGE:
	            return state.set('current', action.data);
	        case _actiontype2.default.CHANGE_PAGE_SIZE:
	            return state.set('size', action.data);
	        case _actiontype2.default.UPDATE_PAGER:
	            return state.merge(action.data);
	        default:
	            return state;
	    }
	};

/***/ },

/***/ 249:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _actiontype = __webpack_require__(175);

	var _actiontype2 = _interopRequireDefault(_actiontype);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    switch (action.type) {
	        case _actiontype2.default.UPDATE_REPOSITORY:
	            return state.merge(action.data);
	        case _actiontype2.default.CHANGE_BRANCH:
	            return state.set('currentBranch', action.data);
	        default:
	            return state;
	    }
	};

/***/ },

/***/ 250:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _actiontype = __webpack_require__(175);

	var _actiontype2 = _interopRequireDefault(_actiontype);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var initState = {
	    isAll: false,
	    indexes: []
	};

	exports.default = function () {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
	    var action = arguments[1];

	    switch (action.type) {
	        case _actiontype2.default.UPDATE_SELECTION:
	            return state.merge(action.data);
	        default:
	            return state;
	    }
	};

/***/ },

/***/ 251:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _actiontype = __webpack_require__(175);

	var _actiontype2 = _interopRequireDefault(_actiontype);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var action = arguments[1];

	    switch (action.type) {
	        case _actiontype2.default.CHANGE_TAB:
	            return action.data;
	        default:
	            return state;
	    }
	};

/***/ }

});