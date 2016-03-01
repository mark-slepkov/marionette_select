define(
    ['backbone'],
    ()->
        Backbone = require('backbone')


        class SelectItem extends Backbone.Model

            initialize: ()->
                return this

            parse: (data)->
                this.set(current_value: 0)
                this.set(current_title: '')

                for item in data.items
                    if item.id == Number(this.get('default_id'))
                        this.set(current_value: item.id)
                        this.set(current_title: item.title)
                        break

                return data

        return SelectItem
)