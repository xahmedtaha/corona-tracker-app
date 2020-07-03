import axios from 'axios'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import Country from './models/country'
import VuexORMSearch from '@vuex-orm/plugin-search'

VuexORM.use(VuexORMSearch, {
    // Configure default fuse.js options here (see "Configuration" section below).
})
VuexORM.use(VuexORMAxios, { axios })

// Create a new instance of Database.
const database = new VuexORM.Database()

// Register Models to Database.
database.register(Country)


export default database
