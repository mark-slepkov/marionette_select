define(
    ['backbone'],
    ()->
        Backbone = require('backbone')


        class Select extends Backbone.Collection

            initialize: ()->
                return this

        return Select
)