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
    fcm_token: null,
    isCordova: !!window.cordova,
    notification: false,
    notificationText: '',
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
    setCountryId(state, id){
      state.countryId = id
    },
    setFCMToken(state, token){
      state.fcm_token = token
    },
    showNotification(state, {msg}){
      state.notification = true
      state.notificationText = msg
    },
    hideNotification(state){
      state.notification = false
      state.notificationText = ''
    }
  },
  actions: {

  },
  modules: {
  },

  plugins: [VuexORM.install(database)]
})
