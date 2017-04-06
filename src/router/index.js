import Vue from 'vue'
import App from '../layouts/App'
import Search from '../layouts/Search'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: App
}, {
    path: '/search',
    component: Search
}];

export default new VueRouter({
    routes
})
