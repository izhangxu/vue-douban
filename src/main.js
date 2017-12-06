// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import store from './store'
import './css/app.css'

Vue.config.productionTip = false

new Vue({
	el: '#app',
	store,
	router
})
