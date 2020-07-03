import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexORM from '@vuex-orm/core'
import database from "../database";
import Country from "../database/models/country";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: false,
    snackbarMsg: '',
    snackbarColor: 'pink',
    countryId: null,
  },
  mutations: {
    showSnackbar(state, {msg, color}){
      state.snackbarMsg = msg;
      state.snackbarColor = color;
      state.snackbar = true;
    },
    hideSnackbar(state){
      state.snackbar = false;
    },
    // setCountryData(state, data){
    //   state.currentCountry = data;
    // },
    setCountryId(state, id){
      state.countryId = id
    }
    // setCountriesIndex(state, data){
    //   state.countriesIndex = data
    // }
  },
  actions: {
    // getCountryData({ commit }, {id}){
    //   return new Promise((resolve, reject) => {
    //     axios.get('http://localhost:8000/countries/'+id).then(response => {
    //       commit('setCountryData', response.data)
    //       resolve()
    //     }).catch(error => {
    //       commit('showSnackbar', {msg: "Error. Couldn't Load Data", color: 'pink'})
    //       reject()
    //     })
    //   })
    // },
    // loadCountriesIndex({ commit }){
    //   return new Promise((resolve, reject) => {
    //     axios.get('http://localhost:8000/countries').then(response => {
    //       commit('setCountriesIndex', response.data)
    //       resolve()
    //     }).catch(error => {
    //       commit('showSnackbar', {msg: "Error. Couldn't Load Data", color: 'pink'})
    //       reject()
    //     })
    //   })
    // }
  },
  modules: {
  },

  plugins: [VuexORM.install(database)]
})
