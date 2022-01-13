import Vue from 'vue';
import auth0 from '@/plugins/auth0';
import i18n from '@/plugins/i18n';
import router from '@/plugins/router';
import vuetify from '@/plugins/vuetify';
import '@/registerServiceWorker';
import store from '@/store';

Vue.config.productionTip = false;

Vue.use(auth0, {
  clientId: process.env.VUE_APP_AUTH0_CLIENT_ID ?? 'vxEMhugPYXIJ19jrDAw6ICDbI5ZkQTdU',
  domain: process.env.VUE_APP_AUTH0_DOMAIN ?? 'sn-main-development.us.auth0.com',

  onFailure(e) {
    // eslint-disable-next-line no-console
    console.log(e);
  },

  async onSuccess(appState) {
    await router.push(appState?.targetUrl ?? window.location.pathname);
  },
});

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: (h) => h('router-view'),
}).$mount('#app');
