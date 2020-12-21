"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactChartjs = require("react-chartjs-2");

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

var options = {
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      ticks: {
        autoSkip: false
      },
      barPercentage: 0.4
    }],
    yAxes: [{
      type: 'linear',
      display: true,
      position: 'right',
      id: 'earnings',
      gridLines: {
        display: false
      },
      ticks: {
        fontColor: 'rgba(138,17,31,0.8)'
      }
    }]
  }
};

var TagBarCharts =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TagBarCharts, _React$Component);

  function TagBarCharts() {
    _classCallCheck(this, TagBarCharts);

    return _possibleConstructorReturn(this, _getPrototypeOf(TagBarCharts).apply(this, arguments));
  }

  _createClass(TagBarCharts, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          name = _this$props.name,
          _this$props$color = _this$props.color,
          color = _this$props$color === void 0 ? 'rgba(138,17,31,0.4)' : _this$props$color,
          _this$props$tickercol = _this$props.tickercolor,
          tickercolor = _this$props$tickercol === void 0 ? 'rgba(138,17,31,1)' : _this$props$tickercol,
          _this$props$height = _this$props.height,
          height = _this$props$height === void 0 ? 80 : _this$props$height,
          ticker = _this$props.ticker,
          _this$props$sector = _this$props.sector,
          sector = _this$props$sector === void 0 ? '' : _this$props$sector;

      if (!data) {
        return _react["default"].createElement("div", {
          className: "font-12"
        }, "Not available at this time... ");
      }

      var dataSorted = _lodash["default"].sortBy(_lodash["default"].filter(data, function (d) {
        return d.value;
      }), function (d) {
        return d.value;
      });

      var chartData = {
        labels: dataSorted.map(function (d) {
          return d.ticker;
        }),
        datasets: [{
          borderWidth: 2,
          // borderColor: color,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          // pointBorderColor: 'red',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 3,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(0,100,0,1)',
          // pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 0,
          pointRadius: 1,
          pointHitRadius: 10,
          yAxisID: 'earnings',
          data: dataSorted.map(function (d) {
            return d.value;
          }),
          backgroundColor: dataSorted.map(function (d) {
            return ticker && d.ticker !== ticker ? color : tickercolor;
          })
        }]
      };
      return _react["default"].createElement("div", {
        style: {
          width: '100%',
          padding: 5,
          fontSize: 8
        }
      }, _react["default"].createElement("div", {
        className: "col-md-12",
        key: name
      }, _react["default"].createElement("span", {
        className: "font-12 darkred bold"
      }, sector ? "".concat(sector, " Sector") : 'Sector', " - ", _react["default"].createElement("span", {
        style: {
          color: 'green'
        }
      }, name)), _react["default"].createElement(_reactChartjs.Bar, {
        options: options,
        data: chartData,
        height: height
      })), _react["default"].createElement("div", {
        style: {
          fontSize: 8
        }
      }, "Generated by ", _react["default"].createElement("span", {
        style: {
          color: 'darkred'
        }
      }, "@earningsfly"), " with ", _react["default"].createElement("span", {
        style: {
          fontSize: 16,
          color: 'red'
        }
      }, "\uD83D\uDE80")));
    }
  }]);

  return TagBarCharts;
}(_react["default"].Component);

var _default = TagBarCharts;
exports["default"] = _default;