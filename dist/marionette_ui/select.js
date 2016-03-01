(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require, exports, module) {
    var Backbone, Marionette, Select, SelectItem, _;
    Marionette = require('marionette');
    Backbone = require('backbone');
    _ = require('underscore');
    SelectItem = (function(superClass) {
      extend(SelectItem, superClass);

      function SelectItem() {
        return SelectItem.__super__.constructor.apply(this, arguments);
      }

      SelectItem.prototype.__module__ = 'marionette_ui';

      SelectItem.prototype.__application__ = 'select_item';

      SelectItem.prototype.events = {
        'mousedown': 'select'
      };

      SelectItem.prototype.initialize = function() {
        return this.generate_template();
      };

      SelectItem.prototype.select = function() {
        return this.triggerMethod('select', this.model);
      };

      SelectItem.prototype.templateHelpers = function() {
        var title_field;
        title_field = this.getOption('title_field');
        return {
          title: this.model.get(title_field)
        };
      };

      return SelectItem;

    })(Marionette.ItemView);
    Select = (function(superClass) {
      extend(Select, superClass);

      function Select() {
        return Select.__super__.constructor.apply(this, arguments);
      }

      Select.prototype.__module__ = 'marionette_ui';

      Select.prototype.__application__ = 'select';

      Select.prototype.className = 'select';

      Select.prototype.childView = SelectItem;

      Select.prototype.childViewContainer = '[data-region="items"]';

      Select.prototype.ui = {
        input: 'input[type="text"]',
        input_result: 'input[type="hidden"]',
        open_button: '[data-action="open-close"]'
      };

      Select.prototype.events = {
        'focus *': 'open',
        'click @ui.open_button': 'on_open_button_click',
        'blur *': 'close'
      };

      Select.prototype.collectionEvents = {
        change: 'render'
      };

      Select.prototype.childEvents = {
        select: 'select'
      };

      Select.prototype.initialize = function(options) {
        var form_map, index, item, items, model_initial_value, title_field, value_field;
        this.generate_template();
        console.log(this);
        items = options.items;
        this.options.value_field = value_field = options['value_field'] || 'id';
        this.options.title_field = title_field = options['title_field'] || 'title';
        form_map = options['form_map'];
        if (!this.collection) {
          this.collection = new Backbone.Collection();
          model_initial_value = {};
          model_initial_value[value_field] = null;
          model_initial_value[title_field] = null;
          for (index in items) {
            item = items[index];
            this.collection.add(item);
          }
        }
        this.model = new Backbone.Model(model_initial_value);
        return this;
      };

      Select.prototype.templateHelpers = function() {
        var name, title, title_field;
        title_field = this.getOption('title_field');
        name = this.getOption('name');
        title = this.model.get(title_field);
        return {
          title: title,
          name: name
        };
      };

      Select.prototype.buildChildView = function(model, ChildViewClass) {
        var full_options, options, title_field;
        title_field = this.getOption('title_field');
        options = {
          title_field: title_field
        };
        full_options = _.extend({
          model: model
        }, options);
        return new ChildViewClass(full_options);
      };

      Select.prototype.on_open_button_click = function() {
        return this.ui.input.focus();
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

      Select.prototype.select = function() {
        var form_map, model, title, value;
        this.model = model = arguments[arguments.length - 1];
        form_map = this.getOption('form_map');
        title = model.get(this.getOption('title_field'));
        value = model.get(this.getOption('value_field'));
        if (form_map) {
          form_map.val(value);
        }
        this.ui.input.val(title);
        if (this.getOption('name')) {
          this.ui.input_result.val(value);
        }
        return this.triggerMethod('select', model);
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
