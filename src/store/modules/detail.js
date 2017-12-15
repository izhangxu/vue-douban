import * as types from '../mutation-types'
import service from '../../api/service'

const state = {
	detailData: [],
	collectList: [],
	collected: false
};

const getters = {
	detailData: state => state.detailData,
	collectList: state => state.collectList,
	collected: state => state.collected
};

const actions = {
	// 获取电影数据
	getDetail({ state, dispatch, commit, rootState }, id) {
		// dispatch('toggleLoading', true)
		commit(types.GET_DETAIL_REQUEST)
		const route = rootState.route;
		if (route) {
			service.getDetail(route.params.id)
				.then(data => {
					if (data.id) {
						data.newCasts = data.casts.map(k => k.name)
						data.newCasts = data.newCasts.join('、')
						data.newDirectors = data.directors.map(k => k.name)
						data.newDirectors = data.newDirectors.join('、')
						data.newCountries = data.countries.join('、')
						commit(types.GET_DETAIL_SUCCESS, data)
					} else {
						commit(types.GET_DETAIL_FAILURE)
					}
					// dispatch('toggleLoading', false)
				})
				.catch(e => {
					commit(types.GET_DETAIL_FAILURE)
					// dispatch('toggleLoading', false)
				})
		}
	},
	// 收藏
	collectMovie({ state, commit, rootState }) {
		const itemIndex = state.collectList.length ? state.collectList.findIndex(ele => ele.id == rootState.route.params.id) : -1
		if (itemIndex < 0) {
			const item = state.detailData
			item.date = Date.now()
			commit(types.COLLECT_MOVIE_ADD, item)
			commit(types.INIT_COLLECT_STATUS, true)
		} else {
			commit(types.COLLECT_MOVIE_DELETE, itemIndex)
			commit(types.INIT_COLLECT_STATUS, false)
		}
	},
	// 初始化收藏状态
	initCollectStats({ commit, rootState }) {
		const item = state.collectList.find(ele => ele.id == rootState.route.params.id)
		commit(types.INIT_COLLECT_STATUS, item ? true : false)
	}
};

const mutations = {
	[types.INIT_COLLECT_STATUS](state, status) {
		state.collected = status
	},
	[types.COLLECT_MOVIE_ADD](state, data) {
		state.collectList.push(data)
	},
	[types.COLLECT_MOVIE_DELETE](state, index) {
		state.collectList.splice(index, 1)
	},
	[types.GET_DETAIL_REQUEST](state) {
		state.detailData = [];
	},
	[types.GET_DETAIL_SUCCESS](state, data) {
		state.detailData = data;
	},
	[types.GET_DETAIL_FAILURE](state) {
		state.detailData = [];
	},
};

export default {
	state,
	getters,
	actions,
	mutations
}
