define(
    (require, exports, module)->
        Marionette = require('marionette')
        Backbone = require('backbone')
        _ = require('underscore')

        class SelectItem extends Marionette.ItemView
            __module__: 'marionette_ui'
            __application__: 'select_item'
            events:
                'mousedown': 'select'

            select: ()->
                this.triggerMethod('select', this.model)

            templateHelpers: ()->
                title_field = this.getOption('title_field')
                return title: this.model.get(title_field)

        class Select extends Marionette.CompositeView
            __module__: 'marionette_ui'
            __application__: 'select'
            className: 'select'
            childView: SelectItem
            childViewContainer: '[data-region="items"]'
            ui:
                input: 'input'
            events:
                'focus *': 'open'
                'blur *': 'close'

            collectionEvents:
                change: 'render'
            childEvents:
                select: 'select'

            # items = [{key: 'key', value: 'value'}, ...]
            initialize: (options)->
                console.log(this)
                items = options.items
                this.options.value_field = value_field = options['value_field'] || 'id'    # Поле модели, которое будет играть роль аттрибута value тега option
                this.options.title_field = title_field = options['title_field'] || 'title' # Поле модели, которое будет показано пользователю при выборе
                form_map = options['form_map']  # Элемент формы в который будут отображаться изменения

                if not this.collection
                    this.collection = new Backbone.Collection()
                    model_initial_value = {}
                    model_initial_value[value_field] = null
                    model_initial_value[title_field] = null
                    for index, item of items
                        this.collection.add(item)
                this.model = new Backbone.Model(model_initial_value)
                return this

            templateHelpers: ()->
                title_field = this.getOption('title_field')
                title = this.model.get(title_field)
                return title: title

            buildChildView: (model, ChildViewClass)->
                title_field = this.getOption('title_field')
                options = title_field: title_field
                full_options = _.extend(model: model, options)
                return new ChildViewClass(full_options)

            open: ()->
                this.open_flag = true
                this.$el.css('z-index': 2**32-1)

            close: ()->
                this.open_flag = false
                this.$el.css('z-index': '')

            select: ()->
                this.model = model = arguments[arguments.length-1]
                form_map = this.getOption('form_map')
                if form_map
                    value = model.get(this.getOption('value_field'))
                    title = model.get(this.getOption('title_field'))
                    form_map.val(value)
                    this.ui.input.val(title)
                this.triggerMethod('select', model)
#                this.render()

            get_value: ()->
                return this.model.toJSON()

            @collection_to_key_value: (collection, key_name, value_name)->
                result = []
                for model in collection.models
                    id = model.get(key_name)
                    value = model.get(value_name)
                    result.push({id: id, title: value})
                return result



        return Select
)