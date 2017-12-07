// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import './css/app.css'


const unsync = sync(store, router)

Vue.config.productionTip = false

new Vue({
	el: '#app',
	store,
	router
})
