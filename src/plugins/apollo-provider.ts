import Vue from 'vue';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);

const httpLink = new HttpLink({ uri: process.env.VUE_APP_PLATFORM_HTTP_URL });

const wsLink = new WebSocketLink({
  uri: process.env.VUE_APP_PLATFORM_WS_URL as string,
  options: { reconnect: true },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const authLink = setContext(async (_, { headers }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) return { headers: { ...headers, authorization: `Bearer ${accessToken}` } };
  return { headers };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default new VueApollo({
  defaultClient: apolloClient,
});
