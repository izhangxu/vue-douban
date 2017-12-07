import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import tabBar from './modules/tabBar'
import movie from './modules/movie'

Vue.use(Vuex);

const state = {
	isLoading: false
};

export default new Vuex.Store({
	state,
	actions,
	getters,
	mutations,
	modules: {
		movie,
		tabBar
	},
	plugins: [createLogger()]
});
