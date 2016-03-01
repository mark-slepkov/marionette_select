define(
  (require, exports, module)->
      Select = require('select')
      Int = require('int')
      Interval = require('interval')
      return {
        Select: Select
        Int: Int
        Interval: Interval
      }
)