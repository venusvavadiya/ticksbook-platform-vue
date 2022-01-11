import Vue from 'vue';
import './registerServiceWorker';
import './plugins/auth0';
import i18n from './plugins/i18n';
import router from './plugins/router';
import vuetify from './plugins/vuetify';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: (h) => h('router-view'),
}).$mount('#app');
