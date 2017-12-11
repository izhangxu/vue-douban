import * as types from '../mutation-types'
import { data_movie_tabs, ajaxApi } from '../../api/data';
import movie from '../../api/movie'

const state = {
	movieListData: [],
	movieTabIndex: 1,
	movieTabData: data_movie_tabs,
	movieTabStyle: '',
	cacheMovieTabIndex: 1,
	movieSearchClear: false
};

const getters = {
	movieSearchClear: state => state.movieSearchClear,
	// 下拉列表
	movieListData: state => state.movieListData,
	// tab
	movieTabData: state => {
		state.movieTabData.forEach((item, i) => {
			item.cur = i == state.movieTabIndex ? true : false;
		})
		return state.movieTabData
	},
	cacheMovieTabIndex: state => state.cacheMovieTabIndex,
	movieTabStyle: state => {
		let len = state.movieTabData.length;
		return {
			width: 100 / len + '%'
		}
	}
};

const actions = {
	// 切换tab
	switchMovieTab({ dispatch, commit }, index) {
		commit(types.TOGGLE_INPUT_CLEAR, index ? false : true)
		commit(types.SWITCH_MOVIE_TAB, index)
		dispatch('switchSearchApi', index)
	},
	// 缓存tabIndex
	cacheMovieTab({ commit,dispatch}) {
		commit(types.CACHE_MOVIE_TAB)
	},
	// 获取movies
	getMovies({ dispatch, commit, rootState }, options = {}) {
		commit(types.GET_MOVIES_REQUEST);
		options.loadingStatus === true && dispatch('loading', true);
		movie.getMovies(rootState.movieSearchApi, options.params)
			.then(data => {
				if (data.total > 0 || data.date) {
					// console.log(data.subjects)
					data = data.subjects;
					data = data.map(item => item.subject ? item.subject : item);
					data.forEach(item => {
						if (item.casts.length) {
							item.newCasts = item.casts.map(ele => ele.name);
							item.newCasts = item.newCasts.join('、');
						}
					});
					commit(types.GET_MOVIES_SUCCESS, data);
				} else {
					commit(types.GET_MOVIES_FAILURE);
				}
				options.loadingStatus === true && dispatch('loading', false);
			})
			.catch(e => {
				commit(types.GET_MOVIES_FAILURE);
				options.loadingStatus === true && dispatch('loading', false);
			})
	},
	// 清除input
	clearMovies({ dispatch, commit }) {
		commit(types.TOGGLE_INPUT_CLEAR, false)
		commit(types.RECOVER_MOVIE_TAB)
		dispatch('clearInputValue')
		dispatch('switchMovieTab', state.movieTabIndex);
	}
};

const mutations = {
	[types.GET_MOVIES_REQUEST](state) {
		state.movieListData = [];
	},
	[types.GET_MOVIES_SUCCESS](state, data) {
		state.movieListData = data;
	},
	[types.GET_MOVIES_FAILURE](state) {
		state.movieListData = [];
	},
	[types.TOGGLE_INPUT_CLEAR](state, status) {
		state.movieSearchClear = status;
	},
	[types.SWITCH_MOVIE_TAB](state, index) {
		state.movieTabIndex = index
	},
	[types.CACHE_MOVIE_TAB](state) {
		const index = state.movieTabIndex == 0 ? 1 : state.movieTabIndex;
		state.cacheMovieTabIndex = index
	},
	[types.RECOVER_MOVIE_TAB](state) {
		state.movieTabIndex = state.cacheMovieTabIndex;
		state.cacheMovieTabIndex = ''
	}
};

export default {
	state,
	getters,
	actions,
	mutations
}
