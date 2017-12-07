import * as types from '../mutation-types'
import { data_movie_tabs } from '../../api/data';
import movie from '../../api/movie'

const state = {
	defaultValue: '',
	movieTabsData: data_movie_tabs,
	movieTabsStyle: '',
	moviesData: [],
	tabIndex: 1,
	showClear: false,
	cacheTabIndex: 1
};

const getters = {
	defaultValue: (state, gatters, rootState) => {
		const route = rootState.route;
		return route.query.word || '';
	},
	movieTabsData: state => state.movieTabsData,
	moviesData: state => state.moviesData,
	tabIndex: state => state.tabIndex,
	movieTabsStyle: state => {
		let len = state.movieTabsData.length;
		return {
			width: 100 / len + '%'
		}
	},
	showClear: state => state.showClear
};

const actions = {
	getMovies({ dispatch, commit }, options = {}) {
		typeof options.loadingStatus === 'boolean' && dispatch('loading', true);
		commit(types.GET_MOVIES_REQUEST);
		movie.getMovies(state.tabIndex, options.params)
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
				typeof options.loadingStatus === 'boolean' && dispatch('loading', false);
			})
			.catch(e => {
				commit(types.GET_MOVIES_FAILURE);
				typeof options.loadingStatus === 'boolean' && dispatch('loading', false);
			})
	},
	clearMovies({commit}) {
		commit(types.TOGGLE_CLEAR, false)
		commit(types.GET_MOVIES_REQUEST)
		dispatch('selectTab');
	},
	selectTab({ dispatch, commit }, index) {
		index = index || state.cacheTabIndex || 1;
		commit(types.MOVIE_TAB, index)
	},
	toggleClear({ commit }, status) {
		commit(types.TOGGLE_CLEAR, status)
	},
	cacheTabIndex({commit}) {
		commit(types.CACHE_MOVIE_TAB)
	}
};

const mutations = {
	[types.CACHE_MOVIE_TAB](state) {
		state.cacheTabIndex = state.tabIndex;
	},
	[types.TOGGLE_CLEAR](state, status) {
		state.showClear = status;
	},
	[types.MOVIE_TAB](state, index) {
		state.tabIndex = index;
		state.movieTabsData.forEach((item, i) => {
			item.cur = i == index ? true : false;
		})
	},
	[types.GET_MOVIES_REQUEST](state) {
		state.moviesData = [];
	},
	[types.GET_MOVIES_SUCCESS](state, data) {
		state.moviesData = data;
	},
	[types.GET_MOVIES_FAILURE](state) {
		state.moviesData = [];
	}
};

export default {
	state,
	getters,
	actions,
	mutations
}
