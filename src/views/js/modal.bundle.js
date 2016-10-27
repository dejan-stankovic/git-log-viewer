webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(33);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _modal = __webpack_require__(252);

	var _modal2 = _interopRequireDefault(_modal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_reactDom2.default.render(_react2.default.createElement(_modal2.default, null), document.getElementById('modal'));

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

	var _electron = __webpack_require__(173);

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
			return _this;
		}

		_createClass(Modal, [{
			key: 'render',
			value: function render() {
				var data = _electron.remote.getCurrentWindow().data;
				console.log(data);
				return _react2.default.createElement(
					'div',
					{ id: 'modal', className: 'glv-modal' },
					_react2.default.createElement(
						'div',
						{ className: 'glv-modal-top' },
						_react2.default.createElement(
							'div',
							{ id: 'modal-loader', className: 'ui segment glv-modal-loader', style: { display: 'none' } },
							_react2.default.createElement(
								'div',
								{ className: 'ui active inverted dimmer' },
								_react2.default.createElement(
									'div',
									{ className: 'ui medium text loader' },
									'Loading'
								)
							)
						),
						_react2.default.createElement(
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
								_react2.default.createElement(
									'div',
									{ className: 'ui compact menu' },
									_react2.default.createElement(
										'div',
										{ className: 'ui simple dropdown item' },
										_react2.default.createElement(
											'span',
											{ id: 'selected-branch' },
											'Choose a branch'
										),
										_react2.default.createElement('i', { className: 'dropdown icon' }),
										_react2.default.createElement('div', { id: 'branches', className: 'menu' })
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
								_react2.default.createElement('ol', { id: 'list-files' })
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'glv-modal-bottom' },
						_react2.default.createElement(
							'div',
							{ id: 'cancel-btn', className: 'ui black deny button' },
							'Cancel'
						),
						_react2.default.createElement(
							'div',
							{ className: 'ui positive right labeled icon button' },
							'Let\'s do it',
							_react2.default.createElement('i', { className: 'checkmark icon' })
						)
					)
				);
			}
		}]);

		return Modal;
	}(_react2.default.Component);

	exports.default = Modal;

/***/ }

});