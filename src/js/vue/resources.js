import Resources from './Resources.vue';
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import possibleTypes from './possibleTypes.json';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: possibleTypes
})

const envHost = window.location.host;

Vue.prototype.$graphEndpoint = "https://"+envHost+"/graph";
if(envHost == "copper.lndo.site"){
  Vue.prototype.$token = "Kufs1JLRcVPjgyOQBLmp8QbRYXxEv3pu";
}else if(envHost == "copper-staging.frb.io"){
  Vue.prototype.$token = "syraWGuP2x8BWxJKV3xzOc7D2kn_-EkM";
}else{
  Vue.prototype.$token = "Kufs1JLRcVPjgyOQBLmp8QbRYXxEv3pu";
}


Vue.use(VueApollo);


const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: "https://localhost:32799",
  cache: new InMemoryCache({
    fragmentMatcher
  }),
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});


export const vm = new Vue({
  el: '#app',
  provide: apolloProvider.provide(),
  render: h => h(Resources),
});
