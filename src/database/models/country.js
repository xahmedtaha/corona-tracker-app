import { Model } from '@vuex-orm/core'

class Country extends Model {
    static entity = 'countries'

    static fields () {
        return {
            id: this.attr(null),
            name: this.attr(''),
            confirmed: this.attr(null),
            recovered: this.attr(null),
            deaths: this.attr(null),
            new_confirmed: this.attr(null),
            new_deaths: this.attr(null),
            created_at: this.attr(null),
            updated_at: this.attr(null),

            order: this.attr(0), // Used For Retrieving By Insertion Order
        }
    }
}

export default Country