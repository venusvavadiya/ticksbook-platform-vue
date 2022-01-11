import Vue from 'vue';
import './registerServiceWorker';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import auth0 from '@/plugins/auth0';
import i18n from './plugins/i18n';
import router from './plugins/router';
import vuetify from './plugins/vuetify';
import store from './store';

Vue.config.productionTip = false;

Vue.use(auth0, {
  clientId: process.env.VUE_APP_AUTH0_CLIENT_ID ?? 'vxEMhugPYXIJ19jrDAw6ICDbI5ZkQTdU',
  domain: process.env.VUE_APP_AUTH0_DOMAIN ?? 'sn-main-development.us.auth0.com',

  onFailure(e: unknown) {
    // eslint-disable-next-line no-console
    console.log(e);
  },

  async onSuccess(appState: unknown) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
