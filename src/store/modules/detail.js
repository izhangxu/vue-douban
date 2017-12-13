import * as types from '../mutation-types'
import movie from '../../api/movie'

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
	getMovieDetail({ state, dispatch, commit, rootState }, id) {
		dispatch('toggleLoading', true)
		const route = rootState.route;
		if (route) {
			movie.getMovieDetail(route.params.id)
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
					dispatch('toggleLoading', false)
				})
				.catch(e => {
					commit(types.GET_DETAIL_FAILURE)
					dispatch('toggleLoading', false)
				})
		}
	},
	collectMovie({ state, commit, rootState }) {
		console.log(state.detailData)
		const itemIndex = state.collectList.length ? state.collectList.findIndex(ele => ele.id == rootState.route.params.id) : -1
		if (itemIndex < 0) {
			const item = state.detailData
			console.log(item)
			item.date = Date.now()
			commit(types.COLLECT_MOVIE_ADD, item)
			commit(types.INIT_COLLECT_STATUS, true)	
		} else {

			commit(types.COLLECT_MOVIE_DELETE, itemIndex)
			commit(types.INIT_COLLECT_STATUS, false)
		}
	},
	initCollectStats({ commit, rootState }) {
		console.log(state.collectList)
		const item = state.detailData.find(ele => ele.id == rootState.route.params.id)
		console.log(item)
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
