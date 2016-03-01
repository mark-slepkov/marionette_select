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

            initialize: ()->
                this.generate_template()

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
                input: '[data-content="title"]'
                input_result: 'input[type="hidden"]'
                open_button: '[data-action="open-close"]'
            events:
                'focus *': 'open'
                'click @ui.open_button': 'on_open_button_click'
                'blur *': 'close'

            collectionEvents:
                change: 'render'
            childEvents:
                select: 'select'

            # items = [{key: 'key', value: 'value'}, ...]
            initialize: (options)->
                this.generate_template()
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
                name = this.getOption('name')
                title = this.model.get(title_field)
                return title: title, name: name

            buildChildView: (model, ChildViewClass)->
                title_field = this.getOption('title_field')
                options = title_field: title_field
                full_options = _.extend(model: model, options)
                return new ChildViewClass(full_options)

            on_open_button_click: ()->
#                console.log(this.ui.input)
                this.ui.input.focus()

            open: ()->
                this.open_flag = true
                this.$el.css('z-index': 2**32-1)

            close: ()->
                this.open_flag = false
                this.$el.css('z-index': '')

            select: ()->
                this.model = model = arguments[arguments.length-1]
                form_map = this.getOption('form_map')
                title = model.get(this.getOption('title_field'))
                value = model.get(this.getOption('value_field'))
                # Если в options был передан form_map, то кидаем в него выбранное значение
                if form_map
                    form_map.val(value)
                this.ui.input.val(title)
                # Если в options был передан name, то это значит что внутренний input будет использован
                # при чтении данных из формы и мы кидаем значение и в него
                if this.getOption('name')
                    this.ui.input_result.val(value)
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