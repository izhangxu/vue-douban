// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import { sync } from 'vuex-router-sync'
import './css/app.css'

const unsync = sync(store, router)

Vue.use(VueResource)

Vue.config.productionTip = false

Vue.filter('handleImageUrl', (value) => {
	if (!value) return '';
	return value.replace(/http\w{0,1}:\/\/(.)/g, 'https://images.weserv.nl/?url=$1');
})

new Vue({
	el: '#app',
	store,
	router
})
