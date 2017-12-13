import Vue from 'vue'
import App from '../App'
import Index from '../components/index/index'
import Movie from '../components/movie/Movie'
import Detail from '../components/detail/Detail'
import Celebrity from '../components/celebrity/Celebrity'
import Admin from '../components/admin/Admin'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
	path: '/',
	component: App,
	children: [{
		path: '',
		redirect: '/index'
	}, {
		name: 'Index',
		path: '/index',
		component: Index
	}, {
		name: 'Movie',
		path: '/movie',
		component: Movie
	}, {
		name: 'Detail',
		path: '/detail/:id',
		component: Detail
	}, {
		name: 'Celebrity',
		path: '/celebrity/:id',
		component: Celebrity
	}, {
		name: 'Admin',
		path: '/admin',
		component: Admin
	}]
}];

export default new VueRouter({
	mode: 'history',
	routes
})
