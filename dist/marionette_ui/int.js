(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require, exports, module) {
    var Backbone, Select, int;
    Select = require('apps/select/select2');
    Backbone = require('backbone');
    int = (function(superClass) {
      extend(int, superClass);

      function int() {
        return int.__super__.constructor.apply(this, arguments);
      }

      int.prototype.__application__ = 'int';

      int.prototype.initialize = function(options) {
        var i, item, max, min, ref, ref1;
        this.generate_template();
        min = options.min;
        max = options.max;
        this.collection = new Backbone.Collection();
        this.model = new Backbone.Model({
          id: null
        });
        for (item = i = ref = min, ref1 = max; ref <= ref1 ? i <= ref1 : i >= ref1; item = ref <= ref1 ? ++i : --i) {
          this.collection.add({
            id: item,
            title: item
          });
        }
        this.collection.on('change', this.render, this);
        this.collection.on('select', this.select, this);
        return this;
      };

      return int;

    })(Select);
    return int;
  });

}).call(this);
