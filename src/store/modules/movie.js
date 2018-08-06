import * as types from '../mutation-types';
import { dataMovieTabs } from '../../api/data';
import service from '../../api/service';

const oState = {
  movieListData: [],
  movieTabIndex: 1,
  movieTabData: dataMovieTabs,
  movieTabStyle: '',
  cacheMovieTabIndex: 1,
  movieSearchClear: false,
  scrollDisabled: false,
  loadTxt: '',
};

const getters = {
  movieSearchClear: state => state.movieSearchClear,
  // 下拉列表
  movieListData: state => state.movieListData,
  movieTabIndex: state => state.movieTabIndex,
  // tab
  movieTabData: (state) => {
    state.movieTabData.forEach((item, i) => {
      item.cur = i === state.movieTabIndex;
    });
    return state.movieTabData;
  },
  cacheMovieTabIndex: state => state.cacheMovieTabIndex,
  movieTabStyle: (state) => {
    const len = state.movieTabData.length;
    return {
      width: `${100 / len}%`,
    };
  },
  scrollDisabled: state => state.scrollDisabled,
  loadTxt: state => state.loadTxt,
};

const actions = {
  changeLoadTxt({ state, commit }, text) {
    if (text === state.loadTxt) return;
    commit(types.CHANGE_LOAD_TXT, text);
  },
  // 切换tab
  switchMovieTab({
    state, dispatch, commit, rootState,
  }, index) {
    if (index !== state.movieTabIndex) {
      const clearStatus = !index;
      if (clearStatus !== state.movieSearchClear) {
        commit(types.TOGGLE_INPUT_CLEAR, clearStatus);
      }
      commit(types.SWITCH_MOVIE_TAB, index);
    }
    if (rootState.movieSearchApi.index !== index) {
      dispatch('switchSearchApi', index);
    }
  },
  // 缓存tabIndex
  cacheMovieTab({ commit }) {
    commit(types.CACHE_MOVIE_TAB);
  },
  // 获取movies
  getMovies({ rootState }, options = {}) {
    return service.getMovies(rootState.movieSearchApi, options.params)
      .then((data) => {
        if (data.total > 0 || data.date) {
          data = data.subjects;
          data = data.map(item => (item.subject ? item.subject : item));
          data.forEach((item) => {
            if (item.casts.length) {
              item.newCasts = item.casts.map(ele => ele.name);
              item.newCasts = item.newCasts.join('、');
            }
            if (item.directors.length) {
              item.newDirectors = item.directors.map(ele => ele.name);
              item.newDirectors = item.newDirectors.join('、');
            }
          });
          return Promise.resolve(data);
        }
      })
      .catch(e => Promise.reject(e));
  },
  // before
  getMoviesRequest({ commit }) {
    commit(types.GET_MOVIES_REQUEST);
  },
  // 成功
  getMoviesSuccess({ commit }, data) {
    commit(types.GET_MOVIES_SUCCESS, data);
  },
  // 失败
  getMoviesFailure({ commit }) {
    commit(types.GET_MOVIES_FAILURE);
  },
  // 禁止滚动
  disableScroll({ state, commit }, status) {
    if (status === state.scrollDisabled) return;
    commit(types.DISABLE_SCROLL, status);
  },
  // 清除input
  clearMovies({ dispatch, commit }) {
    commit(types.TOGGLE_INPUT_CLEAR, false);
    commit(types.RECOVER_MOVIE_TAB);
    commit(types.DISABLE_SCROLL, false);
    commit(types.CHANGE_LOAD_TXT, '加载中...');
    dispatch('clearInputValue');
    dispatch('switchSearchApi', oState.movieTabIndex);
  },
};

const mutations = {
  [types.CHANGE_LOAD_TXT](state, text) {
    state.loadTxt = text;
  },
  [types.DISABLE_SCROLL](state, status) {
    state.scrollDisabled = status;
  },
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
    state.movieTabIndex = index;
  },
  [types.CACHE_MOVIE_TAB](state) {
    const index = state.movieTabIndex === 0 ? 1 : state.movieTabIndex;
    state.cacheMovieTabIndex = index;
  },
  [types.RECOVER_MOVIE_TAB](state) {
    state.movieTabIndex = state.cacheMovieTabIndex;
    state.cacheMovieTabIndex = '';
  },
};

export default {
  state: oState,
  getters,
  actions,
  mutations,
};
