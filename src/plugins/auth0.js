import createAuth0Client from '@auth0/auth0-spa-js';
import Vue from 'vue';

let instance;

function useAuth0({
  clientId,
  domain,
  onFailure,
  onSuccess,
  ...options
}) {
  if (instance) return instance;

  instance = new Vue({
    data() {
      return {
        auth0Client: null,
        isAuthenticated: false,
        loading: true,
        user: {},
      };
    },

    async created() {
      this.auth0Client = await createAuth0Client({
        ...options,
        client_id: clientId,
        domain,
        redirect_uri: window.location.origin,
      });

      try {
        const isAuth0CallbackURL = window.location.search.includes('code=') && window.location.search.includes('state=');
        if (isAuth0CallbackURL) {
          const { appState } = await this.auth0Client.handleRedirectCallback();
          onSuccess(appState);
        }
      } catch (e) {
        await onFailure(e);
      } finally {
        this.isAuthenticated = await this.auth0Client.isAuthenticated();
        this.user = await this.auth0Client.getUser();
        this.loading = false;
      }
    },

    methods: {
      getAccessToken(o) {
        return this.auth0Client.getTokenSilently(o);
      },

      isLoggedIn() {
        return this.isAuthenticated;
      },

      login(o) {
        return this.auth0Client.loginWithRedirect(o);
      },

      logout(o) {
        return this.auth0Client.logout(o);
      },
    },
  });

  return instance;
}

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  install(vue, options) {
    // eslint-disable-next-line no-param-reassign
    vue.prototype.$auth0 = useAuth0(options);
  },
};

// eslint-disable-next-line max-len
// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/explicit-module-boundary-types
export function getAuth0Service() {
  return instance;
}
