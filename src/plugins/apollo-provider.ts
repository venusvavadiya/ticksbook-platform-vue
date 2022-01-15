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

const isDev = process.env.NODE_ENV === 'development';
const baseUrl = isDev ? 'http://localhost:8000' : 'https://ticksbook-platform-api.herokuapp.com';

const httpLink = new HttpLink({ uri: `${baseUrl}/graphql` });

const wsLink = new WebSocketLink({
  uri: isDev ? 'ws://localhost:8000/graphql' : 'wss://ticksbook-platform-api.herokuapp.com/graphql',
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
