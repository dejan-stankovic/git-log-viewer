webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(33);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _electron = __webpack_require__(173);

	var _common = __webpack_require__(171);

	var _common2 = _interopRequireDefault(_common);

	var _modal = __webpack_require__(252);

	var _modal2 = _interopRequireDefault(_modal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var data = _electron.remote.getCurrentWindow().data;
	process.chdir(data.gitdir);

	_common2.default.renderPage(_react2.default.createElement(_modal2.default, { data: data }));

/***/ },

/***/ 252:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _modalMain = __webpack_require__(253);

	var _modalMain2 = _interopRequireDefault(_modalMain);

	var _modalButtons = __webpack_require__(254);

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
			_this.state = {
				ready: false,
				target: []
			};
			_this.selectBranch = _this.selectBranch.bind(_this);
			return _this;
		}

		_createClass(Modal, [{
			key: 'render',
			value: function render() {
				var _state = this.state;
				var ready = _state.ready;
				var target = _state.target;

				return _react2.default.createElement(
					'div',
					{ id: 'modal', className: 'glv-modal' },
					_react2.default.createElement(_modalMain2.default, { data: this.props.data, target: target, selectBranch: this.selectBranch }),
					_react2.default.createElement(_modalButtons2.default, { disabled: !ready, process: function process() {} })
				);
			}
		}, {
			key: 'selectBranch',
			value: function selectBranch(branches) {
				var state = { target: branches };
				if (branches[0] !== this.props.data.currentBranch) state.ready = true;
				this.setState(state);
			}
		}]);

		return Modal;
	}(_react2.default.Component);

	exports.default = Modal;

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

	var _git = __webpack_require__(203);

	var _git2 = _interopRequireDefault(_git);

	var _common = __webpack_require__(217);

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
			_this.state = {
				loading: true,
				progress: 0
			};
			_this.files = [];
			_this.getFilesOfCommit = _this.getFilesOfCommit.bind(_this);
			return _this;
		}

		_createClass(ModalMain, [{
			key: 'render',
			value: function render() {
				var loader = null,
				    form = null;
				var _state = this.state;
				var loading = _state.loading;
				var progress = _state.progress;
				var branches = this.props.data.branches;
				var _props = this.props;
				var target = _props.target;
				var selectBranch = _props.selectBranch;

				if (loading) {
					loader = _react2.default.createElement(_common.Loader, { isFullscreen: true, className: 'inverted', text: 'Loadng ' + progress + '%...' });
				} else {
					var lis = this.files.map(function (file, i) {
						return _react2.default.createElement(
							'li',
							{ key: i, className: 'item' },
							file.filePath
						);
					});
					form = _react2.default.createElement(
						'form',
						{ className: 'ui form' },
						_react2.default.createElement(
							'div',
							{ className: 'field' },
							_react2.default.createElement(
								'label',
								null,
								'Target Branch:'
							),
							_react2.default.createElement(_common.Select, {
								options: branches,
								selectedOptions: target,
								stringOption: true,
								placeHolder: 'Pick target branch',
								onChange: selectBranch })
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
				return _react2.default.createElement(
					'div',
					{ className: 'glv-modal-top' },
					loader,
					form
				);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.getFilesOfCommit(0);
			}
		}, {
			key: 'getFilesOfCommit',
			value: function getFilesOfCommit(index) {
				var _this2 = this;

				var commits = this.props.data.commits;

				if (index >= commits.length) {
					return this.setState({
						loading: false,
						progress: 100
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

					_this2.setState({ progress: Math.ceil((index + 1) / commits.length * 100) });
					_this2.getFilesOfCommit(index + 1);
				}).catch(function (err) {
					console.error(err);
				});
			}
		}]);

		return ModalMain;
	}(_react2.default.Component);

	exports.default = ModalMain;

/***/ },

/***/ 254:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _electron = __webpack_require__(173);

	var _common = __webpack_require__(217);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (props) {
		var closeModal = function closeModal() {
			_electron.remote.getCurrentWindow().destroy();
		};
		return _react2.default.createElement(
			'div',
			{ className: 'glv-modal-bottom' },
			_react2.default.createElement(_common.Button, {
				buttonClass: 'black deny',
				label: 'Cancel',
				onClick: closeModal }),
			_react2.default.createElement(_common.Button, {
				buttonClass: 'positive right labeled icon',
				disabled: props.disabled,
				iconClass: 'checkmark',
				label: 'Let\'s do it',
				onClick: props.process })
		);
	};

/***/ }

});