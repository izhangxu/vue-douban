import Vue from 'vue';
import VueRouter from 'vue-router';

const App = () => import('../App');
const Index = () => import('../components/index/index');
const Movie = () => import('../components/movie/Movie');
const Detail = () => import('../components/detail/Detail');
const Celebrity = () => import('../components/celebrity/Celebrity');
const Admin = () => import('../components/admin/Admin');

Vue.use(VueRouter);

const routes = [{
  path: '/',
  component: App,
  children: [{
    path: '',
    redirect: '/index',
  }, {
    name: 'Index',
    path: '/index',
    component: Index,
  }, {
    name: 'Movie',
    path: '/movie',
    component: Movie,
  }, {
    name: 'Detail',
    path: '/detail/:id',
    component: Detail,
  }, {
    name: 'Celebrity',
    path: '/celebrity/:id',
    component: Celebrity,
  }, {
    name: 'Admin',
    path: '/admin',
    component: Admin,
  }],
}];

export default new VueRouter({
  base: '/',
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {
      x: 0,
      y: 0,
    };
  },
});
