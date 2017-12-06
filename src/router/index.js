import Vue from 'vue'
import App from '../components/App'
import Movie from '../components/Movie'
import Detail from '../components/Detail'
import Celebrity from '../components/Celebrity'
import Admin from '../components/Admin'

import Test from '../components/Test'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
    name : 'App',
    path: '/',
    component: App
}, {
	name: 'Movie',
    path: '/movie',
    component: Movie
}, {
	name: 'Detail',
	path: '/detail/:id',
	component: Detail
},{
	name: 'Celebrity',
	path: '/celebrity/:id',
	component: Celebrity
}, {
	name: 'Admin',
	path: '/admin',
	component: Admin
}];

export default new VueRouter({
	mode: 'history',
    routes
})
