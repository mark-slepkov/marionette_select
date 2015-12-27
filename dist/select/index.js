(function() {
  define(function(require, exports, module) {
    var Int, Interval, Select;
    Select = require('select');
    Int = require('int');
    Interval = require('interval');
    return {
      Select: Select,
      Int: Int,
      Interval: Interval
    };
  });

}).call(this);
