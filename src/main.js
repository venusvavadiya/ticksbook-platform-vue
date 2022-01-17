import Vue from 'vue';
import apolloProvider from '@/plugins/apollo-provider';
import auth0 from '@/plugins/auth0';
import i18n from '@/plugins/i18n';
import router from '@/plugins/router';
import vuetify from '@/plugins/vuetify';
import UIDialog from '@/ui/ui-dialog.vue';
import UITextField from '@/ui/ui-text-field.vue';
import '@/registerServiceWorker';
import store from '@/store';

Vue.config.productionTip = false;

Vue.component('ui-dialog', UIDialog);
Vue.component('ui-text-field', UITextField);

Vue.use(auth0, {
  clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
  domain: process.env.VUE_APP_AUTH0_DOMAIN,

  onFailure(e) {
    // eslint-disable-next-line no-console
    console.log(e);
  },

  async onSuccess(appState) {
    await router.push(appState?.targetUrl ?? window.location.pathname);
  },
});

new Vue({
  apolloProvider,
  i18n,
  router,
  store,
  vuetify,
  render: (h) => h('router-view'),
}).$mount('#app');
