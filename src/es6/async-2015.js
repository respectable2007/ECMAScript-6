"use strict";
const regeneratorRuntime = require('regenerator-runtime');
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(function () {
  var value = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(v) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return v;

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function value(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var output = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(list) {
      var lens, i;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              lens = list.length;
              i = 0;

            case 2:
              if (!(i < lens)) {
                _context2.next = 8;
                break;
              }

              _context2.next = 5;
              return value(list[i]).then(function (v) {
                console.log(v);
              });

            case 5:
              i++;
              _context2.next = 2;
              break;

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function output(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var list = [1, 2, 3, 4];

  output(list);
})();
