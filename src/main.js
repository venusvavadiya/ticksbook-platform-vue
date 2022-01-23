import Vue from 'vue';
import apolloProvider from '@/plugins/apollo-provider';
import auth0 from '@/plugins/auth0';
import i18n from '@/plugins/i18n';
import router from '@/plugins/router';
import vuetify from '@/plugins/vuetify';
import UICardFormActions from '@/ui/ui-card-form-actions.vue';
import UIDataTable from '@/ui/ui-data-table.vue';
import UIDialog from '@/ui/ui-dialog.vue';
import UITextField from '@/ui/ui-text-field.vue';
import '@/registerServiceWorker';
import store from '@/store';

Vue.config.productionTip = false;

Vue.component('ui-card-form-actions', UICardFormActions);
Vue.component('ui-data-table', UIDataTable);
Vue.component('ui-dialog', UIDialog);
Vue.component('ui-text-field', UITextField);

Vue.use(auth0, {
  clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  // eslint-disable-next-line no-console
  onFailure: console.log,

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
