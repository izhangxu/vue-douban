import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex);

export default new Vuex.Store({
	actions,
	getters,
	modules: {
		footer
	},
	plugins: [createLogger()]
});
