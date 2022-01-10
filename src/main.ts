import Vue from 'vue';
import './registerServiceWorker';
import router from './plugins/router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h('router-view'),
}).$mount('#app');
