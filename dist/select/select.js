(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require, exports, module) {
    var Marionette, Select, SelectItem;
    Marionette = require('marionette');
    SelectItem = (function(superClass) {
      extend(SelectItem, superClass);

      function SelectItem() {
        return SelectItem.__super__.constructor.apply(this, arguments);
      }

      SelectItem.prototype.__module__ = 'select';

      SelectItem.prototype.__application__ = 'item';

      SelectItem.prototype.initialize = function() {
        return this.generate_template();
      };

      return SelectItem;

    })(Marionette.ItemView);
    Select = (function(superClass) {
      extend(Select, superClass);

      function Select() {
        return Select.__super__.constructor.apply(this, arguments);
      }

      Select.prototype.__module__ = 'select';

      Select.prototype.__application__ = 'select';

      Select.prototype.childView = SelectItem;

      Select.prototype.childViewContainer = 'menu';

      Select.prototype.events = {
        'mousedown menu button': 'select',
        'focus *': 'open',
        'blur *': 'close'
      };

      Select.prototype.initialize = function(options) {
        if (options.__template__) {
          this.__template__ = options.__template__;
        }
        this.generate_template();
        this.open_flag = false;
        if (!this.model) {
          this.model = this.collection;
        }
        this.model.on('sync', this.render, this);
        this.model.on('change', this.render, this);
        return this;
      };

      Select.prototype.open = function() {
        this.open_flag = true;
        return this.$el.css({
          'z-index': Math.pow(2, 32) - 1
        });
      };

      Select.prototype.close = function() {
        this.open_flag = false;
        return this.$el.css({
          'z-index': ''
        });
      };

      Select.prototype.select = function(e) {
        var id, title;
        id = $(e.target).attr('data-value');
        title = $(e.target).text();
        this.model.set({
          current_value: id
        });
        return this.model.set({
          current_title: title
        });
      };

      return Select;

    })(Marionette.CompositeView);
    return Select;
  });

}).call(this);
