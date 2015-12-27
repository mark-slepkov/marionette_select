define(
    (require, exports, module)->
        Marionette = require('marionette')
        Backbone = require('backbone')

        class SelectItem extends Marionette.ItemView
            __module__: 'select'
            __application__: 'item'
            events:
                'mousedown': 'select'

            select: ()->
                this.model.collection.trigger('select', this.model)

        class Select extends Marionette.CompositeView
            __module__: 'select'
            __application__: 'select'
            className: 'select'
            childView: SelectItem
            childViewContainer: '[data-region="items"]'
            events:
                'focus *': 'open'
                'blur *': 'close'

            # items = [{key: 'key', value: 'value'}, ...]
            initialize: (items)->
                this.collection = new Backbone.Collection()
                this.model = new Backbone.Model(id: null)
                for item of items
                    this.collection.add(items[item])
                this.collection.on('change', this.render, this)
                this.collection.on('select', this.select, this)
                return this

            open: ()->
                this.open_flag = true
                this.$el.css('z-index': 2**32-1)

            close: ()->
                this.open_flag = false
                this.$el.css('z-index': '')

            select: (model)->
                this.model = model
                this.trigger('select', model)
                this.render()

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