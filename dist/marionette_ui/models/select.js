(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['backbone'], function() {
    var Backbone, SelectItem;
    Backbone = require('backbone');
    SelectItem = (function(superClass) {
      extend(SelectItem, superClass);

      function SelectItem() {
        return SelectItem.__super__.constructor.apply(this, arguments);
      }

      SelectItem.prototype.initialize = function() {
        return this;
      };

      SelectItem.prototype.parse = function(data) {
        var i, item, len, ref;
        this.set({
          current_value: 0
        });
        this.set({
          current_title: ''
        });
        ref = data.items;
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          if (item.id === Number(this.get('default_id'))) {
            this.set({
              current_value: item.id
            });
            this.set({
              current_title: item.title
            });
            break;
          }
        }
        return data;
      };

      return SelectItem;

    })(Backbone.Model);
    return SelectItem;
  });

}).call(this);
