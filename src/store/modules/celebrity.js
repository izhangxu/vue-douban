import * as types from '../mutation-types'
import service from '../../api/service'

const state = {
	celebrityData: []
};

const getters = {
	celebrityData: state => state.celebrityData
};

const actions = {
	// 获取人物数据
	getCelebrity({ state, dispatch, commit, rootState }, id) {
		// dispatch('toggleLoading', true)
		commit(types.GET_CELEBRITY_REQUEST)
		const route = rootState.route;
		if (route) {
			service.getCelebrity(route.params.id)
				.then(data => {
					if (data.id) {
						commit(types.GET_CELEBRITY_SUCCESS, data)
					} else {
						commit(types.GET_CELEBRITY_FAILURE)
					}
					// dispatch('toggleLoading', false)
				})
				.catch(e => {
					commit(types.GET_CELEBRITY_FAILURE)
					// dispatch('toggleLoading', false)
				})
		}
	}
};

const mutations = {
	[types.GET_CELEBRITY_REQUEST](state) {
		state.celebrityData = [];
	},
	[types.GET_CELEBRITY_SUCCESS](state, data) {
		state.celebrityData = data;
	},
	[types.GET_CELEBRITY_FAILURE](state) {
		state.celebrityData = [];
	},
};

export default {
	state,
	getters,
	actions,
	mutations
}
