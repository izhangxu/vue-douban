import Vue from 'vue'
import App from '../components/App'
import Search from '../components/Search'
import Detail from '../components/Detail'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: App
}, {
	name: 'Search',
    path: '/search',
    component: Search
}, {
	name: 'Detail',
	path: '/detail/:id',
	component: Detail
}];

export default new VueRouter({
    routes
})
