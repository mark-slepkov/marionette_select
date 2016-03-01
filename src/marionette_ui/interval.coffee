define(
    (require, exports, module)->
        Marionette = require('marionette')
        SelectInt = require('apps/select/int')


        class interval extends Marionette.LayoutView
            __module__: 'select'
            __application__: 'interval'
            regions:
                int_from: '[data-region="from"]'
                int_to: '[data-region="to"]'
            initialize: (options)->
                this.generate_template()
                this.min = options.min
                this.max = options.max
                return this

            onRender: ()->
                this.from = new SelectInt({min: this.min, max: this.max})
                this.to = new SelectInt({min: this.min, max: this.max})
                this.getRegion('int_from').show(this.from)
                this.getRegion('int_to').show(this.to)

            get_value: ()->
                return {min: this.from.get_value()['id'], max: this.to.get_value()['id']}

        return interval
)