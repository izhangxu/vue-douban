import * as types from '../mutation-types'
import { data_movie_tabs } from '../../api/data';
import movie from '../../api/movie'

const state = {
	defaultValue: '',
	movieTabsData: data_movie_tabs,
	movieTabsStyle: '',
	moviesData: [],
	tabIndex: 1
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
	}
};

const actions = {
	getMovies({ state, commit }) {
		commit(types.GET_MOVIES_REQUEST);
		movie.getMovies(state.tabIndex)
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
			})
			.catch(e => {
				commit(types.GET_MOVIES_FAILURE);
			})
	},
	selectTab({ state, commit }, index) {
		commit(types.MOVIE_TAB, index)
	}
};

const mutations = {
	[types.MOVIE_TAB](state, index) {
		state.tabIndex = index || 1;
		state.movieTabsData.forEach((item, i) => {
			item.cur = i == index ? true: false;
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
