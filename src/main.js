import Vue from 'vue'
import App from './App.vue'
import router from "./routes.js";
import store from "./store/index";
import vuetify from './plugins/vuetify';
Vue.config.productionTip = false
store.dispatch('autoLogin');
new Vue({
  render: h => h(App),
  router,
  vuetify,
  store
}).$mount('#app')
