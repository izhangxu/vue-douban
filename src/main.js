import Vue from 'vue';
import VueResource from 'vue-resource';
import { sync } from 'vuex-router-sync';
import App from './App';
import router from './router/';
import store from './store/';
import './styles/app.css';

sync(store, router);

Vue.use(VueResource);

Vue.config.productionTip = false;

Vue.filter('handleImageUrl', (value) => {
  if (!value) return '';
  return value.replace(/http\w{0,1}:\/\/(.)/g, 'https://images.weserv.nl/?url=$1');
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
