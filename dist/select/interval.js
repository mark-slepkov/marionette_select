(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require, exports, module) {
    var Marionette, SelectInt, interval;
    Marionette = require('marionette');
    SelectInt = require('apps/select/int');
    interval = (function(superClass) {
      extend(interval, superClass);

      function interval() {
        return interval.__super__.constructor.apply(this, arguments);
      }

      interval.prototype.__module__ = 'select';

      interval.prototype.__application__ = 'interval';

      interval.prototype.regions = {
        int_from: '[data-region="from"]',
        int_to: '[data-region="to"]'
      };

      interval.prototype.initialize = function(options) {
        this.generate_template();
        this.min = options.min;
        this.max = options.max;
        return this;
      };

      interval.prototype.onRender = function() {
        this.from = new SelectInt({
          min: this.min,
          max: this.max
        });
        this.to = new SelectInt({
          min: this.min,
          max: this.max
        });
        this.getRegion('int_from').show(this.from);
        return this.getRegion('int_to').show(this.to);
      };

      interval.prototype.get_value = function() {
        return {
          min: this.from.get_value()['id'],
          max: this.to.get_value()['id']
        };
      };

      return interval;

    })(Marionette.LayoutView);
    return interval;
  });

}).call(this);
