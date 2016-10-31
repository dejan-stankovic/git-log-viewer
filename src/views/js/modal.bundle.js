webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(177);

	var _reduxThunk = __webpack_require__(192);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reactRedux = __webpack_require__(193);

	var _electron = __webpack_require__(173);

	var _seamlessImmutable = __webpack_require__(202);

	var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

	var _common = __webpack_require__(171);

	var _common2 = _interopRequireDefault(_common);

	var _modal = __webpack_require__(253);

	var _modal2 = _interopRequireDefault(_modal);

	var _reducers = __webpack_require__(263);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var data = _electron.remote.getCurrentWindow().data;
	process.chdir(data.gitdir);
	var initState = (0, _seamlessImmutable2.default)({ data: data });
	var store = (0, _redux.createStore)(_reducers2.default, initState, (0, _redux.applyMiddleware)(_reduxThunk2.default));
	_common2.default.renderPage(_react2.default.createElement(
	  _reactRedux.Provider,
	  { store: store },
	  _react2.default.createElement(_modal2.default, null)
	));

/***/ },

/***/ 253:
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

	var _modalMain = __webpack_require__(254);

	var _modalMain2 = _interopRequireDefault(_modalMain);

	var _modalButtons = __webpack_require__(262);

	var _modalButtons2 = _interopRequireDefault(_modalButtons);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Modal = function (_React$Component) {
		_inherits(Modal, _React$Component);

		function Modal(props) {
			_classCallCheck(this, Modal);

			var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

			_this.props = props;
			_this.closeModal = _this.closeModal.bind(_this);
			_this.process = _this.process.bind(_this);
			return _this;
		}

		_createClass(Modal, [{
			key: 'render',
			value: function render() {
				var ready = this.props.ready;

				return _react2.default.createElement(
					'div',
					{ id: 'modal', className: 'glv-modal' },
					_react2.default.createElement(_modalMain2.default, null),
					_react2.default.createElement(_modalButtons2.default, { cancel: this.closeModal, disabled: !ready, process: this.process })
				);
			}
		}, {
			key: 'closeModal',
			value: function closeModal() {
				_electron.remote.getCurrentWindow().destroy();
			}
		}, {
			key: 'process',
			value: function process() {
				var _props = this.props,
				    data = _props.data,
				    files = _props.files,
				    target = _props.target,
				    output = _props.output;
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = files.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var file = _step.value;

						_git2.default.diff(file.filePath, data.currentBranch, target).then(function (output) {
							_electron.ipcRenderer.send(_app2.default.CHANNEL_EXPORT_HTML_DIFF, output);
						}).catch(function (err) {
							throw err;
						});
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
			}
		}]);

		return Modal;
	}(_react2.default.Component);

	var mapStateToProps = function mapStateToProps(state) {
		return {
			data: state.data,
			files: state.files,
			target: state.target,
			output: state.output,
			ready: state.ready
		};
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
		return {};
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Modal);

/***/ },

/***/ 254:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(193);

	var _git = __webpack_require__(203);

	var _git2 = _interopRequireDefault(_git);

	var _common = __webpack_require__(217);

	var _actions = __webpack_require__(255);

	var _modalMainForm = __webpack_require__(261);

	var _modalMainForm2 = _interopRequireDefault(_modalMainForm);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ModalMain = function (_React$Component) {
		_inherits(ModalMain, _React$Component);

		function ModalMain(props) {
			_classCallCheck(this, ModalMain);

			var _this = _possibleConstructorReturn(this, (ModalMain.__proto__ || Object.getPrototypeOf(ModalMain)).call(this, props));

			_this.props = props;
			_this.files = [];

			_this.renderLoader = _this.renderLoader.bind(_this);
			_this.renderForm = _this.renderForm.bind(_this);
			_this.getFilesOfCommit = _this.getFilesOfCommit.bind(_this);
			return _this;
		}

		_createClass(ModalMain, [{
			key: 'render',
			value: function render() {
				var _props = this.props,
				    diffType = _props.diffType,
				    files = _props.files,
				    target = _props.target;
				var loading = files.loading,
				    progress = files.progress,
				    data = files.data;

				return _react2.default.createElement(
					'div',
					{ className: 'glv-modal-top' },
					this.renderLoader(),
					this.renderForm()
				);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.getFilesOfCommit(0);
			}
		}, {
			key: 'renderLoader',
			value: function renderLoader() {
				var _props$files = this.props.files,
				    loading = _props$files.loading,
				    progress = _props$files.progress;

				if (!loading) return null;
				return _react2.default.createElement(_common.Loader, {
					isFullscreen: true,
					className: 'inverted',
					text: 'Loadng ' + progress + '%...' });
			}
		}, {
			key: 'renderForm',
			value: function renderForm() {
				if (this.props.files.loading) return null;
				return _react2.default.createElement(_modalMainForm2.default, null);
			}
		}, {
			key: 'getFilesOfCommit',
			value: function getFilesOfCommit(index) {
				var _this2 = this;

				var _props2 = this.props,
				    updateFiles = _props2.updateFiles,
				    setProgress = _props2.setProgress;
				var commits = this.props.data.commits;

				if (index >= commits.length) {
					return updateFiles({
						loading: false,
						progress: 100,
						data: this.files
					});
				}
				_git2.default.getFilesByCommitHash(commits[index].hash).then(function (results) {
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						var _loop = function _loop() {
							var file = _step.value;

							var f = _this2.files.find(function (tmp) {
								return tmp.filePath === file.filePath;
							});
							if (!f) _this2.files.push(file);
						};

						for (var _iterator = results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							_loop();
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

					setProgress(Math.ceil((index + 1) / commits.length * 100));
					_this2.getFilesOfCommit(index + 1);
				}).catch(function (err) {
					throw err;
					console.error(err);
				});
			}
		}]);

		return ModalMain;
	}(_react2.default.Component);

	var mapStateToProps = function mapStateToProps(state) {
		return {
			data: state.data,
			diffType: state.diffType,
			files: state.files,
			target: state.target
		};
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
		return {
			updateFiles: function updateFiles(files) {
				return dispatch(_actions.FilesAction.updateFiles(files));
			},
			setProgress: function setProgress(progress) {
				return dispatch(_actions.FilesAction.setProgress(progress));
			}
		};
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ModalMain);

/***/ },

/***/ 255:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TargetAction = exports.ReadyAction = exports.OutputAction = exports.FilesAction = exports.DiffTypeAction = undefined;

	var _diffType = __webpack_require__(256);

	var _diffType2 = _interopRequireDefault(_diffType);

	var _files = __webpack_require__(258);

	var _files2 = _interopRequireDefault(_files);

	var _output = __webpack_require__(259);

	var _output2 = _interopRequireDefault(_output);

	var _ready = __webpack_require__(257);

	var _ready2 = _interopRequireDefault(_ready);

	var _target = __webpack_require__(260);

	var _target2 = _interopRequireDefault(_target);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.DiffTypeAction = _diffType2.default;
	exports.FilesAction = _files2.default;
	exports.OutputAction = _output2.default;
	exports.ReadyAction = _ready2.default;
	exports.TargetAction = _target2.default;

/***/ },

/***/ 256:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _common = __webpack_require__(171);

	var _common2 = _interopRequireDefault(_common);

	var _ready = __webpack_require__(257);

	var _ready2 = _interopRequireDefault(_ready);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DiffTypeAction = function () {
		function DiffTypeAction() {
			_classCallCheck(this, DiffTypeAction);
		}

		_createClass(DiffTypeAction, null, [{
			key: 'updateDiffType',
			value: function updateDiffType(diffType) {
				return function (dispatch, getState) {
					var _getState = getState(),
					    target = _getState.target;

					dispatch(_common2.default.getAction('DIFF_TYPE_UPDATE', diffType));
					dispatch(_ready2.default.setReady());
				};
			}
		}]);

		return DiffTypeAction;
	}();

	exports.default = DiffTypeAction;

/***/ },

/***/ 257:
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

	var ReadyAction = function () {
		function ReadyAction() {
			_classCallCheck(this, ReadyAction);
		}

		_createClass(ReadyAction, null, [{
			key: 'setReady',
			value: function setReady() {
				return function (dispatch, getState) {
					var _getState = getState(),
					    data = _getState.data,
					    target = _getState.target,
					    diffType = _getState.diffType,
					    output = _getState.output;

					if (target[0] === data.currentBranch || diffType.length === 0 || output === '') {
						dispatch(_common2.default.getAction('READY_UPDATE', false));
					} else {
						dispatch(_common2.default.getAction('READY_UPDATE', true));
					}
				};
			}
		}]);

		return ReadyAction;
	}();

	exports.default = ReadyAction;

/***/ },

/***/ 258:
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

	var FilesAction = function () {
		function FilesAction() {
			_classCallCheck(this, FilesAction);
		}

		_createClass(FilesAction, null, [{
			key: 'updateFiles',
			value: function updateFiles(files) {
				return _common2.default.getAction('FILES_UPDATE', files);
			}
		}, {
			key: 'setProgress',
			value: function setProgress(progress) {
				return _common2.default.getAction('FILES_SET_PROGRESS', progress);
			}
		}]);

		return FilesAction;
	}();

	exports.default = FilesAction;

/***/ },

/***/ 259:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _common = __webpack_require__(171);

	var _common2 = _interopRequireDefault(_common);

	var _ready = __webpack_require__(257);

	var _ready2 = _interopRequireDefault(_ready);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var OutputAction = function () {
		function OutputAction() {
			_classCallCheck(this, OutputAction);
		}

		_createClass(OutputAction, null, [{
			key: 'updateOutput',
			value: function updateOutput(output) {
				return function (dispatch) {
					dispatch(_common2.default.getAction('OUTPUT_UPDATE', output));
					dispatch(_ready2.default.setReady());
				};
			}
		}]);

		return OutputAction;
	}();

	exports.default = OutputAction;

/***/ },

/***/ 260:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _common = __webpack_require__(171);

	var _common2 = _interopRequireDefault(_common);

	var _ready = __webpack_require__(257);

	var _ready2 = _interopRequireDefault(_ready);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TargetAction = function () {
		function TargetAction() {
			_classCallCheck(this, TargetAction);
		}

		_createClass(TargetAction, null, [{
			key: 'updateTarget',
			value: function updateTarget(target) {
				return function (dispatch, getState) {
					var _getState = getState(),
					    diffType = _getState.diffType;

					dispatch(_common2.default.getAction('TARGET_UPDATE', target));
					dispatch(_ready2.default.setReady());
				};
			}
		}]);

		return TargetAction;
	}();

	exports.default = TargetAction;

/***/ },

/***/ 261:
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

	var _common = __webpack_require__(217);

	var _actions = __webpack_require__(255);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DIFF_TYPES = [{ value: 1, text: 'Line by line' }, { value: 2, text: 'Side by side' }];

	var ModalMainForm = function (_React$Component) {
		_inherits(ModalMainForm, _React$Component);

		function ModalMainForm(props) {
			_classCallCheck(this, ModalMainForm);

			var _this = _possibleConstructorReturn(this, (ModalMainForm.__proto__ || Object.getPrototypeOf(ModalMainForm)).call(this, props));

			_this.props = props;
			_this.selectTarget = _this.selectTarget.bind(_this);
			_this.selectDiffType = _this.selectDiffType.bind(_this);
			_this.selectOutput = _this.selectOutput.bind(_this);
			_this.updateOutput = _this.updateOutput.bind(_this);
			return _this;
		}

		_createClass(ModalMainForm, [{
			key: 'render',
			value: function render() {
				var _props = this.props,
				    data = _props.data,
				    files = _props.files,
				    target = _props.target,
				    diffType = _props.diffType,
				    output = _props.output;
				var branches = data.branches,
				    currentBranch = data.currentBranch;

				var lis = files.data.map(function (file, i) {
					return _react2.default.createElement(
						'li',
						{ key: i, className: 'item' },
						file.filePath
					);
				});
				return _react2.default.createElement(
					'form',
					{ className: 'ui form' },
					_react2.default.createElement(
						'div',
						{ className: 'field' },
						_react2.default.createElement(
							'label',
							null,
							'Current branch: ',
							currentBranch
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'two fields' },
						_react2.default.createElement(
							'div',
							{ className: 'field' },
							_react2.default.createElement(
								'label',
								null,
								'Target branch:'
							),
							_react2.default.createElement(_common.Select, {
								options: branches,
								selectedOptions: target,
								stringOption: true,
								placeHolder: 'Pick target branch',
								onChange: this.selectTarget })
						),
						_react2.default.createElement(
							'div',
							{ className: 'field' },
							_react2.default.createElement(
								'label',
								null,
								'Diff type:'
							),
							_react2.default.createElement(_common.Select, {
								options: DIFF_TYPES,
								selectedOptions: diffType,
								placeHolder: 'Select diff type',
								onChange: this.selectDiffType })
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'field' },
						_react2.default.createElement(
							'label',
							null,
							'Select output directory:'
						),
						_react2.default.createElement(
							'div',
							{ className: 'ui left action input' },
							_react2.default.createElement(_common.Button, { buttonClass: 'teal', iconClass: 'folder open', label: 'Browse', onClick: this.selectOutput }),
							_react2.default.createElement(
								'div',
								{ className: 'ui input' },
								_react2.default.createElement('input', { className: 'glv-input-disabled', type: 'text', value: output, disabled: true })
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'field' },
						_react2.default.createElement(
							'label',
							null,
							'List files to diff:'
						),
						_react2.default.createElement(
							'ol',
							{ className: 'glv-modal-files' },
							lis
						)
					)
				);
			}
		}, {
			key: 'selectTarget',
			value: function selectTarget(target) {
				this.props.updateTarget(target);
			}
		}, {
			key: 'selectDiffType',
			value: function selectDiffType(diffType) {
				this.props.updateDiffType(diffType);
			}
		}, {
			key: 'selectOutput',
			value: function selectOutput(e) {
				e.preventDefault();
				_electron.ipcRenderer.send(_app2.default.CHANNEL_SHOW_DIR_DIALOG, _app2.default.CHANNEL_SELECTED_DIR);
				_electron.ipcRenderer.once(_app2.default.CHANNEL_SELECTED_DIR, this.updateOutput);
			}
		}, {
			key: 'updateOutput',
			value: function updateOutput(e, dirs) {
				if (!dirs) return;
				this.props.updateOutput(dirs[0]);
			}
		}]);

		return ModalMainForm;
	}(_react2.default.Component);

	var mapStateToProps = function mapStateToProps(state) {
		return {
			data: state.data,
			target: state.target,
			diffType: state.diffType,
			files: state.files,
			output: state.output
		};
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
		return {
			updateTarget: function updateTarget(target) {
				return dispatch(_actions.TargetAction.updateTarget(target));
			},
			updateDiffType: function updateDiffType(diffType) {
				return dispatch(_actions.DiffTypeAction.updateDiffType(diffType));
			},
			updateOutput: function updateOutput(output) {
				return dispatch(_actions.OutputAction.updateOutput(output));
			}
		};
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ModalMainForm);

/***/ },

/***/ 262:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _common = __webpack_require__(217);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (props) {
		return _react2.default.createElement(
			'div',
			{ className: 'glv-modal-bottom' },
			_react2.default.createElement(_common.Button, {
				buttonClass: 'black deny',
				label: 'Cancel',
				onClick: props.cancel }),
			_react2.default.createElement(_common.Button, {
				buttonClass: 'positive right labeled icon',
				disabled: props.disabled,
				iconClass: 'checkmark',
				label: 'Let\'s do it',
				onClick: props.process })
		);
	};

/***/ },

/***/ 263:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _reduxSeamlessImmutable = __webpack_require__(236);

	var _data = __webpack_require__(264);

	var _data2 = _interopRequireDefault(_data);

	var _diffType = __webpack_require__(265);

	var _diffType2 = _interopRequireDefault(_diffType);

	var _files = __webpack_require__(266);

	var _files2 = _interopRequireDefault(_files);

	var _ready = __webpack_require__(267);

	var _ready2 = _interopRequireDefault(_ready);

	var _target = __webpack_require__(268);

	var _target2 = _interopRequireDefault(_target);

	var _output = __webpack_require__(269);

	var _output2 = _interopRequireDefault(_output);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _reduxSeamlessImmutable.combineReducers)({ data: _data2.default, diffType: _diffType2.default, files: _files2.default, ready: _ready2.default, target: _target2.default, output: _output2.default });

/***/ },

/***/ 264:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function (state, action) {
		return state;
	};

/***/ },

/***/ 265:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _actiontype = __webpack_require__(175);

	var _actiontype2 = _interopRequireDefault(_actiontype);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var action = arguments[1];

		switch (action.type) {
			case _actiontype2.default.DIFF_TYPE_UPDATE:
				return action.data;
			default:
				return state;
		}
	};

/***/ },

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _actiontype = __webpack_require__(175);

	var _actiontype2 = _interopRequireDefault(_actiontype);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var initState = {
		loading: true,
		progress: 0,
		data: []
	};

	exports.default = function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
		var action = arguments[1];

		switch (action.type) {
			case _actiontype2.default.FILES_UPDATE:
				return state.merge(action.data);
			case _actiontype2.default.FILES_SET_PROGRESS:
				return state.set('progress', action.data);
			default:
				return state;
		}
	};

/***/ },

/***/ 267:
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

		switch (action.type) {
			case _actiontype2.default.READY_UPDATE:
				return action.data;
			default:
				return state;
		}
	};

/***/ },

/***/ 268:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _actiontype = __webpack_require__(175);

	var _actiontype2 = _interopRequireDefault(_actiontype);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var action = arguments[1];

		switch (action.type) {
			case _actiontype2.default.TARGET_UPDATE:
				return action.data;
			default:
				return state;
		}
	};

/***/ },

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _actiontype = __webpack_require__(175);

	var _actiontype2 = _interopRequireDefault(_actiontype);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
		var action = arguments[1];

		switch (action.type) {
			case _actiontype2.default.OUTPUT_UPDATE:
				return action.data;
			default:
				return state;
		}
	};

/***/ }

});