define(
    (require, exports, module)->
        Marionette = require('marionette')


        class SelectItem extends Marionette.ItemView
            __module__: 'select'
            __application__: 'item'

            initialize: ()->
                this.generate_template()


        class Select extends Marionette.CompositeView
            __module__: 'select'
            __application__: 'select'
            childView: SelectItem
            childViewContainer: 'menu'
            events:
                'mousedown menu button': 'select'
                'focus *': 'open'
                'blur *': 'close'


            initialize: (options)->
                if options.__template__
                    this.__template__ = options.__template__
                this.generate_template()
                this.open_flag = false
                if not this.model
                    this.model = this.collection
                this.model.on('sync', this.render, this)
                this.model.on('change', this.render, this)
                return this

            open: ()->
                this.open_flag = true
                this.$el.css('z-index': 2**32-1)

            close: ()->
                this.open_flag = false
                this.$el.css('z-index': '')

            select: (e)->
                id = $(e.target).attr('data-value')
                title = $(e.target).text()
                this.model.set(current_value: id)
                this.model.set(current_title: title)


        return Select
)