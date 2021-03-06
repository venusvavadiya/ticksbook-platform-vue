import Vue from 'vue';
import apolloProvider from '@/plugins/apollo-provider';
import auth0 from '@/plugins/auth0';
import i18n from '@/plugins/i18n';
import router from '@/plugins/router';
import vuetify from '@/plugins/vuetify';
import { GraphQLPlatformMutationService } from '@/service/graphql-platform-mutation-service';
import { GraphQLPlatformQueryService } from '@/service/graphql-platform-query-service';
import UIDataTable from '@/ui/ui-data-table.vue';
import UIDialog from '@/ui/ui-dialog.vue';
import UIFormDialog from '@/ui/ui-form-dialog.vue';
import UITextField from '@/ui/ui-text-field.vue';
import '@/registerServiceWorker';
import store from '@/store';

Vue.config.productionTip = false;

Vue.component('ui-data-table', UIDataTable);
Vue.component('ui-dialog', UIDialog);
Vue.component('ui-form-dialog', UIFormDialog);
Vue.component('ui-text-field', UITextField);

Vue.use(auth0, {
  clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
  domain: process.env.VUE_APP_AUTH0_DOMAIN,

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

  provide() {
    return {
      platformMutationService: new GraphQLPlatformMutationService(this.$apollo),
      platformQueryService: new GraphQLPlatformQueryService(this.$apollo),
    };
  },
}).$mount('#app');
