"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.NumberOfEmployees = void 0;

var _react = _interopRequireDefault(require("react"));

var _dayjs = _interopRequireDefault(require("dayjs"));

var _reactChartjs = require("react-chartjs-2");

var _reactCopyToClipboard = require("react-copy-to-clipboard");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var NumberOfEmployees =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NumberOfEmployees, _React$Component);

  function NumberOfEmployees(props) {
    var _this;

    _classCallCheck(this, NumberOfEmployees);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NumberOfEmployees).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(NumberOfEmployees, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var profile = this.props.profile;
      if (!profile) return true;
      if (nextState.copied) return true;
      if (profile.ticker !== nextProps.profile.ticker) return true;
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var profile = this.props.profile;
      var copied = this.state.copied;

      if (!profile || !profile.numbers) {
        return _react["default"].createElement("div", {
          className: "font-12"
        }, "Not available at this time... ");
      }

      if (profile.num_employees && profile.num_employees.url) {
        var btnClass = copied ? 'react-components-show-url btn btn-sm btn-danger disabled font-10' : 'react-components-show-url btn btn-sm btn-warning font-10';
        var btnText = copied ? 'Copied' : 'Copy Img';
        return _react["default"].createElement("div", {
          className: "react-components-show-button"
        }, _react["default"].createElement("img", {
          alt: "".concat(profile.ticker, " - ").concat(profile.name, " revenue and income margins"),
          src: profile.num_employees.url,
          style: {
            width: '100%'
          }
        }), _react["default"].createElement(_reactCopyToClipboard.CopyToClipboard, {
          text: profile.num_employees.url || '',
          onCopy: function onCopy() {
            return _this2.setState({
              copied: true
            });
          }
        }, _react["default"].createElement("button", {
          className: btnClass,
          value: btnText
        }, btnText)));
      }

      var number_of_employees_ts = profile.numbers.number_of_employees_ts || [];
      var number_of_employees = number_of_employees_ts.map(function (d) {
        return d.employees;
      });
      var datasets = [{
        backgroundColor: '#A93226',
        borderColor: '#A93226',
        borderCapStyle: 'butt',
        pointBorderColor: '#A93226',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#A93226',
        pointHoverBorderColor: '#A93226',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: number_of_employees
      }];
      var data = {
        labels: number_of_employees_ts.map(function (d) {
          return _dayjs["default"].utc(d.ts).format('YYYYMM');
        }),
        datasets: datasets
      };
      var min = _.min(number_of_employees) || 0;
      var max = _.max(number_of_employees) || Number.MAX_SAFE_INTEGER;
      var options = {
        legend: {
          display: false,
          labels: {
            fontSize: 10,
            boxWidth: 10
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 10
            },
            barPercentage: 0.4
          }],
          yAxes: [{
            ticks: {
              fontSize: 10,
              min: min === max ? Math.floor(max / 2) : Math.max(2 * min - max, 0)
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: function label(tooltipItem, data) {
              var label = 'Number of employees: ';
              label += tooltipItem.yLabel || 'n/a';
              return label;
            }
          }
        }
      };
      return _react["default"].createElement(_reactChartjs.Bar, {
        data: data,
        height: 150,
        options: options
      });
    }
  }]);

  return NumberOfEmployees;
}(_react["default"].Component);

exports.NumberOfEmployees = NumberOfEmployees;
var _default = NumberOfEmployees;
exports["default"] = _default;