import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import tabBar from './modules/tabBar'
import movie from './modules/movie'
import detail from './modules/detail'

Vue.use(Vuex);

const state = {
	isLoading: false,
	inputValue: '',
	tabBarIndex: 0,
	movieSearchApi: {},
};

export default new Vuex.Store({
	state,
	actions,
	getters,
	mutations,
	modules: {
		movie,
		tabBar,
		detail
	},
	plugins: [createLogger()]
});
