import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueWait from 'vue-wait'
import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  locales: {

  }
})
Vue.use(VueWait)

// Vue.config.ignoredElements = [/^ion-/]
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  wait: new VueWait({
    useVuex: true,
  }),
  render: h => h(App)
}).$mount('#app')
