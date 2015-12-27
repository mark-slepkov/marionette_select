(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require, exports, module) {
    var Backbone, Marionette, Select, SelectItem;
    Marionette = require('marionette');
    Backbone = require('backbone');
    SelectItem = (function(superClass) {
      extend(SelectItem, superClass);

      function SelectItem() {
        return SelectItem.__super__.constructor.apply(this, arguments);
      }

      SelectItem.prototype.__module__ = 'select';

      SelectItem.prototype.__application__ = 'item';

      SelectItem.prototype.events = {
        'mousedown': 'select'
      };

      SelectItem.prototype.select = function() {
        return this.model.collection.trigger('select', this.model);
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

      Select.prototype.className = 'select';

      Select.prototype.childView = SelectItem;

      Select.prototype.childViewContainer = '[data-region="items"]';

      Select.prototype.events = {
        'focus *': 'open',
        'blur *': 'close'
      };

      Select.prototype.initialize = function(items) {
        var item;
        this.collection = new Backbone.Collection();
        this.model = new Backbone.Model({
          id: null
        });
        for (item in items) {
          this.collection.add(items[item]);
        }
        this.collection.on('change', this.render, this);
        this.collection.on('select', this.select, this);
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

      Select.prototype.select = function(model) {
        this.model = model;
        this.trigger('select', model);
        return this.render();
      };

      Select.prototype.get_value = function() {
        return this.model.toJSON();
      };

      Select.collection_to_key_value = function(collection, key_name, value_name) {
        var i, id, len, model, ref, result, value;
        result = [];
        ref = collection.models;
        for (i = 0, len = ref.length; i < len; i++) {
          model = ref[i];
          id = model.get(key_name);
          value = model.get(value_name);
          result.push({
            id: id,
            title: value
          });
        }
        return result;
      };

      return Select;

    })(Marionette.CompositeView);
    return Select;
  });

}).call(this);
