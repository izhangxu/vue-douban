import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import footer from './modules/footer'

Vue.use(Vuex);

const state = {
	tabBarIndex: 0,
	isLoading: false
};

export default new Vuex.Store({
	state,
	actions,
	getters,
	mutations,
	modules: {
		footer
	},
	plugins: [createLogger()]
});
