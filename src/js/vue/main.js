import App from './App.vue';

const envHost = window.location.host;

Vue.prototype.$graphEndpoint = "https://"+envHost+"/graph";
if(envHost == "copper.lndo.site"){
  Vue.prototype.$token = "Kufs1JLRcVPjgyOQBLmp8QbRYXxEv3pu";
}else if(envHost == "copper-staging.frb.io"){
  Vue.prototype.$token = "syraWGuP2x8BWxJKV3xzOc7D2kn_-EkM";
}else{
  Vue.prototype.$token = "Kufs1JLRcVPjgyOQBLmp8QbRYXxEv3pu";
}

new Vue({
  el: '#app',
  render: h => h(App),
});
