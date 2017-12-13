import Vue from 'vue'
import App from '../App'
import Movie from '../components/movie/Movie'
import Detail from '../components/detail/Detail'
import Celebrity from '../components/celebrity/Celebrity'
import Admin from '../components/admin/Admin'


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
