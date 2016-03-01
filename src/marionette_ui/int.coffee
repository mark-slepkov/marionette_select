define(
    (require, exports, module)->
        Select = require('apps/select/select2')
        Backbone = require('backbone')

        class int extends Select
            __application__: 'int'

            initialize: (options)->
                this.generate_template()
                min = options.min
                max = options.max
                this.collection = new Backbone.Collection()
                this.model = new Backbone.Model(id: null)
                for item in [min..max]
                    this.collection.add({id: item, title: item})
                this.collection.on('change', this.render, this)
                this.collection.on('select', this.select, this)
                return this

        return int
)